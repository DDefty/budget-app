/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/

-- First, update any NULL values to the default value
UPDATE "User" SET "name" = 'User' WHERE "name" IS NULL;

-- Then make the column required and set the default
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'User';
