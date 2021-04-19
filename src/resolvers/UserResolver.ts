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
class RegisterInput {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  identity_number: string;

  @Field()
  health_insurance_name: string;

  @Field()
  health_insurance_id: string;

  @Field()
  mobile_phone: string;

  @Field()
  phone: string;

  @Field()
  street: string;

  @Field()
  number: string;

  @Field()
  apartment_suit: string;

  @Field()
  city: string;

  @Field()
  neighborhood: string;

  @Field()
  province: string;

  @Field()
  email: string;

  @Field()
  emergency_phone: string;

  @Field()
  password: string;

  @Field()
  security_question_1: string;

  @Field()
  security_question_2: string;

  @Field()
  security_answer_1: string;

  @Field()
  security_answer_2: string;
}

interface NameInterface {
  first_name: string
  last_name: string
}

interface AddressInterface {
  province: string
  location: string
  neighborhood: string
  street: string
  street_number: string
  floor: string
  department: string
}

interface PhoneInterface {
  type: string
  number: string
}

interface IdentitiesInterface {
  user_id: string
  provider: string
  connection: string
}

@ObjectType()
export class Profiler {
  @Field()
  id: string

  @Field()
  user_id: string
  
  @Field()
  user_identification: string
  
  @Field()
  user_identification_type: string
  
  user_name: [NameInterface]
  
  @Field()
  email: string
  
  @Field()
  email_verified: boolean

  address: [AddressInterface]
  
  phone: [PhoneInterface]
  
  @Field()
  is_blocked: boolean
  
  @Field()
  name: string

  @Field()
  picture: string

  identities: [IdentitiesInterface]

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
    const user = await User.create(data).save();
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
    const users = (await User.find()).map(({ id }) => id);
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
          id: "1",  
          user_id: "0|52234632",
          user_identification: "10123456",
          user_identification_type: "DNI",
          user_name: [
            {
              first_name: "Lu Han",
              last_name: "Chin Cun Lu"
            }
          ],
          email: "user@domain.com",
          email_verified: true,
          address: [
            {
              province: "string",
              location: "string",
              neighborhood: "string",
              street: "string",
              street_number: "string",
              floor: "string",
              department: "string"
            }
          ],
          phone: [
            {
              type: "Mobile | Residential",
              number: "string"
            }
          ],
          is_blocked: false,
          name: "foo@bar.com",
          picture: "https://s.gravatar.com/avatar/foobar.png",
          identities: [
            {
              user_id: "string",
              provider: "OAuth",
              connection: "Username-Password-Authentication"
            }
          ],
          created_at: "2021-04-13T11:16:59.640Z"
        })
      } catch (error) {
        reject(error)
      }
      
    })
  }
}


