import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export type MyContext = {
  prisma: PrismaClient<
    {
      log: "query"[];
    },
    never
  >;
  req: Request & { session: { userId?: number } };
  res: Response;
};
