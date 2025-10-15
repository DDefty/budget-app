/*
  Prisma seed — single user: test123@example.com
  Compatible with Prisma 4.x/5.x (NO Prisma.$Enums required)
  - Uses string literal union types for enums
  - Uses amount as string for Decimal
  - No generators/for-of over custom iterables

  Run (in /api):
    npx prisma generate
    npx prisma studio  # ensure user test123@example.com exists
    npx ts-node prisma-seed.ts
*/
// @ts-nocheck

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { addDays, subYears } from "date-fns";

const prisma = new PrismaClient();

// ---- Local types (avoid Prisma-specific enum exports) ----
type CategoryKind = "EXPENSE" | "INCOME";
type Currency = "PLN";

// ---- Config ----
const EMAIL = "test123@example.com";
const TX_COUNT = 200; // transactions to create
const YEARS = 1;        // random date span
const BATCH = 1000;     // createMany chunk size

// ---- Data pools ----
const expenseCategoryPool = [
  "Groceries","Rent","Utilities","Transport",
] as const;

const incomeCategoryPool = [
  "Salary","Bonus",
] as const;

const accountPool = ["Credit Card","Revolut"] as const;
const currencies: Currency[] = ["PLN"];

// ---- Helpers ----
function randChoice<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

function randomDateWithinYears(years: number) {
  const start = subYears(new Date(), years);
  const days = Math.floor((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24));
  return addDays(start, faker.number.int({ min: 0, max: days }));
}

function amountFor(kind: CategoryKind): string {
  if (kind === "EXPENSE") {
    const v = faker.number.float({ min: 2, max: 500, multipleOf: 0.01 });
    return (-v).toFixed(2);
  } else {
    const v = faker.number.float({ min: 50, max: 8000, multipleOf: 0.01 });
    return v.toFixed(2);
  }
}

function descriptionFor(kind: CategoryKind): string {
  if (kind === "EXPENSE") return faker.finance.transactionDescription();
  return faker.helpers.arrayElement([
    "Monthly salary","Quarterly bonus","Freelance invoice","Dividend payment","Refund received",
  ]);
}

// ---- Main ----
async function main() {
  const user = await prisma.user.findUnique({ where: { email: EMAIL } });
  if (!user) {
    console.error(`User with email ${EMAIL} not found.`);
    process.exit(1);
  }

  // 1) Ensure categories exist for this user
  const categoriesToCreate: Array<{ name: string; kind: CategoryKind }> = [
    ...expenseCategoryPool.map((name) => ({ name, kind: "EXPENSE" as CategoryKind })),
    ...incomeCategoryPool.map((name) => ({ name, kind: "INCOME" as CategoryKind })),
  ];

  await prisma.category.createMany({
    data: categoriesToCreate.map((c: { name: string; kind: CategoryKind }) => ({
      userId: user.id,
      name: c.name,
      kind: c.kind,
    })),
    skipDuplicates: true,
  });

  const categories = await prisma.category.findMany({ where: { userId: user.id } });
  const expenseCats = categories.filter((c) => c.kind === "EXPENSE");
  const incomeCats = categories.filter((c) => c.kind === "INCOME");

  type Tx = {
    userId: string;
    account: string;
    categoryId: string | null;
    date: Date;
    description: string;
    note: string | null;
    amount: string; // Decimal as string
    currency: Currency;
    createdAt: Date;
    updatedAt: Date;
  };

  const rows: Tx[] = new Array(TX_COUNT);

  for (let i = 0; i < TX_COUNT; i++) {
    const kind: CategoryKind = Math.random() < 0.8 ? "EXPENSE" : "INCOME";
    const catList = kind === "EXPENSE" ? expenseCats : incomeCats;
    const category = randChoice(catList);
    const date = randomDateWithinYears(YEARS);

    rows[i] = {
      userId: user.id,
      account: randChoice(accountPool as unknown as string[]),
      categoryId: category ? (category.id as string) : null,
      date,
      description: descriptionFor(kind),
      note: Math.random() < 0.3 ? faker.lorem.sentence() : null,
      amount: amountFor(kind),
      currency: randChoice(currencies),
      createdAt: date,
      updatedAt: date,
    };
  }

  for (let start = 0; start < rows.length; start += BATCH) {
    const group = rows.slice(start, start + BATCH);
    await prisma.transaction.createMany({ data: group });
    if ((start + group.length) % 10000 === 0) {
      console.log(`${start + group.length}/${TX_COUNT} transactions inserted`);
    }
  }

  console.log(`Done! Inserted ${TX_COUNT} transactions for ${EMAIL}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });