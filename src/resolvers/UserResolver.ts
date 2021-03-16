import { Resolver, Mutation, Arg, Query, InputType, Field } from "type-graphql";
import { User } from "../entity/User";

@InputType()
class LoginInput {
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
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(@Arg("data", () => RegisterInput) data: RegisterInput) {
    const user = await User.create(data).save();
    return user;
  }

  @Mutation(() => Boolean)
  async login(@Arg("data", () => LoginInput) data: LoginInput) {
    const user = await User.find({
      where: {
        identity_number: data.identity_number,
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
}