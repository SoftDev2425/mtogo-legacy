/*
  Warnings:

  - You are about to drop the column `state` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "state";

-- AlterTable
ALTER TABLE "Customers" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
