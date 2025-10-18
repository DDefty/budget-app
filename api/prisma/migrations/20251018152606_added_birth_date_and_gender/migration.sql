-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "gender" "Gender";
