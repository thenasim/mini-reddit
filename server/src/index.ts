import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

async function main() {
  /* await prisma.user.create({
    data: {
      username: "mehedi",
      password: "1234",
      name: "mehedi hasan",
    },
  }); */
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
