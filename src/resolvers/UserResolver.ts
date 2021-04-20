import { Resolver, Mutation, Arg, Query, InputType, Field, ObjectType } from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json';
import PasswordValidation from "./PasswordValidation.class";
import { User } from "../entity/User";

@InputType()
class LoginInput {
  @Field()
  user_identification: string;

  @Field()
  user_identification_type: string;

  @Field()
  password: string;
}

@InputType()
class PasswordRecoveryInput {
  @Field()
  identity_number: string;

  @Field()
  password: string;
}

@InputType()
class UserName {
  @Field()
  first_name: string
  
  @Field()
  last_name: string
  
  @Field()
  user_identification: string
  
  @Field()
  user_identification_type: string
}

@InputType()
class SecurityQuestions {
  @Field()
  id: number
  
  @Field()
  value: string
}

@InputType()
class Phone {
  @Field()
  phone: string
  
  @Field()
  mobile_phone: string
  
  @Field()
  emergency_phone: string
}

@InputType()
class Address {
  @Field()
  province: string
  
  @Field()
  location: string
  
  @Field()
  neighborhood: string
  
  @Field()
  street: string
  
  @Field()
  street_number: string
  
  @Field()
  apartment_floor: string
  
  @Field()
  apartment_suit: string
}


@InputType()
class RegisterInput {
  @Field()
  user_name: UserName

  @Field()
  health_insurance_name: String

  @Field()
  health_insurance_id: String

  @Field()
  email: String

  @Field()
  password: String

  @Field()
  repeat_password: String

  @Field()
  phone: Phone

  @Field()
  address: Address

  @Field(_type => [SecurityQuestions])
  security_questions: SecurityQuestions[]

  @Field()
  birth_date: String
}

@ObjectType()
export class Profiler {
  @Field()
  user_id: number;
  
  @Field()
  user_identification: string
  
  @Field()
  user_identification_type: string
  
  @Field()
  user_name: string
  
  @Field()
  email: string
  
  @Field()
  email_verified: boolean

  @Field()
  address: string
  
  @Field()
  phone: string
  
  @Field()
  is_blocked: boolean
  
  @Field()
  name: string

  @Field()
  picture: string

  @Field()
  identities: string

  @Field()
  created_at: string
}

@InputType()
class ProfilerInput {
  @Field()
  auth_token: string
}

@Resolver()
export class UserResolver {
  @Mutation(() => GraphQLJSONObject || null)
  async recoverPassword(
    @Arg("data", () => PasswordRecoveryInput) data: PasswordRecoveryInput
  ) {
    const password = new PasswordValidation(data.password);
    if (password.validate()) {
      return {
        result: true,
        errors: [],
      };
    }
    const errors: string[] = [];

    errors.push(
      data.password.length === 0
        ? "Debe completar el password"
        : "El formato no es correcto"
    );

    return {
      result: false,
      errors: errors,
    };
  }
  @Mutation(() => User)
  async register(@Arg("data", () => RegisterInput) data: RegisterInput) {
    const newUser = {
      user_identification: data.user_name.user_identification,
      user_identification_type: data.user_name.user_identification_type,
      user_name: JSON.stringify(data.user_name),
      email: data.email.toString(),
      email_verified: false,
      address: JSON.stringify(data.address),
      phone: JSON.stringify(data.phone),
      is_blocked: false,
      name: data.user_name.first_name,
      picture: "",
      identities: JSON.stringify([]),
      created_at: Date.now().toString(),
    }
    const user = await User.create(newUser).save();
    return user;
  }

  @Mutation(() => Boolean)
  async signin(@Arg("data", () => LoginInput) data: LoginInput) {
    const user = await User.find({
      where: {
        identity_number: data.user_identification,
        password: data.password,
      },
    }).catch((error) => console.log(error));

    return user && user.length > 0;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async deleteAll() {
    const users = (await User.find()).map(({ user_id }) => user_id);
    users.forEach((id) => {
      User.delete(id);
    });
    return true;
  }

  @Query(() => Profiler)
  profiler(@Arg("data", () => ProfilerInput) _data: ProfilerInput) {
    return new Promise<Profiler>((resolve, reject) => {
      try {
        resolve({ 
          user_id: 0,
          user_identification: "10123456",
          user_identification_type: "DNI",
          user_name: JSON.stringify([
            {
              first_name: "Lu Han",
              last_name: "Chin Cun Lu"
            }
          ]),
          email: "user@domain.com",
          email_verified: true,
          address: JSON.stringify([
            {
              province: "string",
              location: "string",
              neighborhood: "string",
              street: "string",
              street_number: "string",
              floor: "string",
              department: "string"
            }
          ]),
          phone: JSON.stringify([
            {
              type: "Mobile | Residential",
              number: "string"
            }
          ]),
          is_blocked: false,
          name: "foo@bar.com",
          picture: "https://s.gravatar.com/avatar/foobar.png",
          identities: JSON.stringify([
            {
              user_id: "string",
              provider: "OAuth",
              connection: "Username-Password-Authentication"
            }
          ]),
          created_at: "2021-04-13T11:16:59.640Z"
        })
      } catch (error) {
        reject(error)
      }
      
    })
  }
}


