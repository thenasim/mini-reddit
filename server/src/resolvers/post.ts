import { MyContext } from "../types";
import { Post } from "../schemas/Post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() { prisma }: MyContext) {
    return await prisma.post.findMany();
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number, @Ctx() { prisma }: MyContext) {
    try {
      return await prisma.post.findUnique({ where: { id } });
    } catch {
      return null;
    }
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Arg("userid") userId: number,
    @Ctx() { prisma }: MyContext
  ) {
    return await prisma.post.create({
      data: { title, user: { connect: { id: userId } } },
    });
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("title") title: string,
    @Arg("id") id: number,
    @Ctx() { prisma }: MyContext
  ) {
    try {
      return await prisma.post.update({ where: { id }, data: { title } });
    } catch {
      return null;
    }
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number, @Ctx() { prisma }: MyContext) {
    try {
      await prisma.post.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
