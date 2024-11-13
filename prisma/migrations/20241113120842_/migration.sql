/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Restaurants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurants" ADD COLUMN     "phone" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "MTOGO_Admins" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MTOGO_Admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MTOGO_Admins_email_key" ON "MTOGO_Admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurants_phone_key" ON "Restaurants"("phone");
