import { PrismaClient } from "@prisma/client";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const prisma = new PrismaClient({
  log: ["query"],
});

async function main() {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ prisma }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log(`http://localhost:4000`));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
