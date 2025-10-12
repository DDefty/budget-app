import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.deleteMany({});
  console.log("✅ All transactions deleted.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());