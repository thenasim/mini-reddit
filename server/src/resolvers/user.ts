import { MyContext } from "../types";
import { User } from "../schemas/User";
import argon2 from "argon2";
import { MaxLength, MinLength, validate } from "class-validator";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

// Input Type
@InputType()
class LoginInput {
  @Field()
  username: string;

  @Field()
  @MinLength(4, { message: "Password length can't be less than 4" })
  @MaxLength(12, { message: "Password length can't be upper than 12" })
  password: string;
}

@InputType()
class RegisterInput extends LoginInput {
  @Field()
  name: string;
}

// Error Types
@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

// User Response Type
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, prisma }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    return await prisma.user.findUnique({ where: { id: req.session.userId } });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterInput,
    @Ctx() { prisma, req }: MyContext
  ) {
    const check = await validate(options);

    console.log(check);

    if (check.length > 0) {
      return {
        errors: [
          {
            field: check[0].property,
            message:
              check[0].constraints?.minLength ||
              check[0].constraints?.maxLength,
          },
        ],
      };
    }

    const userExists = await prisma.user.findUnique({
      where: { username: options.username },
    });

    if (userExists) {
      return {
        errors: [{ field: "username", message: "username already exists" }],
      };
    }

    const hashedPass = await argon2.hash(options.password);
    const user = await prisma.user.create({
      data: {
        username: options.username,
        password: hashedPass,
        name: options.name,
      },
    });

    // Store user id session
    // this will set a cookie on the browser
    // keep them logged in
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { prisma, req }: MyContext
  ) {
    const user = await prisma.user.findUnique({
      where: { username: options.username },
    });

    if (!user) {
      return {
        errors: [{ field: "username", message: "username doesn't exists" }],
      };
    }

    const validPass = await argon2.verify(user.password, options.password);
    if (!validPass) {
      return {
        errors: [{ field: "password", message: "password doesn't match" }],
      };
    }

    req.session.userId = user.id;

    return { user };
  }
}
