import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field(() => String)
  createdAt: String;

  @Field(() => String)
  updatedAt: String;

  @Field(() => String)
  username: String;

  @Field(() => String)
  name: String;
}
