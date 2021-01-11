import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Post {
  @Field()
  id: number;

  @Field(() => String)
  createdAt: String;

  @Field(() => String)
  updatedAt: String;

  @Field(() => String)
  title: String;
}
