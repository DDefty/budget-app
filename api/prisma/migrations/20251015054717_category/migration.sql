/*
  Warnings:

  - You are about to drop the column `accountId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `payee` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Budget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `account` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Budget" DROP CONSTRAINT "Budget_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BudgetItem" DROP CONSTRAINT "BudgetItem_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BudgetItem" DROP CONSTRAINT "BudgetItem_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_accountId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_categoryId_fkey";

-- DropIndex
DROP INDEX "public"."Category_userId_kind_idx";

-- DropIndex
DROP INDEX "public"."Transaction_userId_accountId_date_idx";

-- DropIndex
DROP INDEX "public"."Transaction_userId_categoryId_date_idx";

-- DropIndex
DROP INDEX "public"."User_email_idx";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "accountId",
DROP COLUMN "payee",
ADD COLUMN     "account" TEXT NOT NULL,
ADD COLUMN     "currency" "Currency" NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP DEFAULT;

-- DropTable
DROP TABLE "public"."Account";

-- DropTable
DROP TABLE "public"."Budget";

-- DropTable
DROP TABLE "public"."BudgetItem";

-- DropEnum
DROP TYPE "public"."AccountType";

-- CreateIndex
CREATE INDEX "Category_userId_kind_name_idx" ON "Category"("userId", "kind", "name");

-- CreateIndex
CREATE INDEX "Transaction_categoryId_date_idx" ON "Transaction"("categoryId", "date");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
