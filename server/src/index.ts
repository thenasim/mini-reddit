import express from "express";
import session from "express-session";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";

const prisma = new PrismaClient({
  log: ["query"],
});

async function main() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "qid",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 day
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
      saveUninitialized: false,
      resave: false,
      secret: "FJj4_88_asfF",
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ prisma, req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => console.log(`http://localhost:4000`));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
