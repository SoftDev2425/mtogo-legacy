/*
  Warnings:

  - The `role` column on the `Admins` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `Customers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `Restaurants` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'RESTAURANT', 'ADMIN');

-- AlterTable
ALTER TABLE "Admins" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "Customers" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE "Restaurants" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'RESTAURANT';

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menus" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR(255),
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Menus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_title_key" ON "Categories"("title");

-- CreateIndex
CREATE INDEX "restaurant_id_index_category" ON "Categories"("restaurantId");

-- CreateIndex
CREATE INDEX "title_index" ON "Categories"("title");

-- CreateIndex
CREATE INDEX "sort_order_index" ON "Categories"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Menus_title_key" ON "Menus"("title");

-- CreateIndex
CREATE INDEX "restaurant_id_index_menu" ON "Menus"("restaurantId");

-- CreateIndex
CREATE INDEX "category_id_index" ON "Menus"("categoryId");

-- CreateIndex
CREATE INDEX "price_index" ON "Menus"("price");

-- CreateIndex
CREATE INDEX "sort_order_index_menu" ON "Menus"("sortOrder");

-- CreateIndex
CREATE INDEX "city_zip_index" ON "Address"("city", "zip");

-- CreateIndex
CREATE INDEX "coordinates_index" ON "Address"("x", "y");

-- CreateIndex
CREATE INDEX "Customers_email_idx" ON "Customers"("email");

-- CreateIndex
CREATE INDEX "Customers_phone_idx" ON "Customers"("phone");

-- CreateIndex
CREATE INDEX "Restaurants_name_idx" ON "Restaurants"("name");

-- CreateIndex
CREATE INDEX "address_id_index" ON "Restaurants"("addressId");

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menus" ADD CONSTRAINT "Menus_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menus" ADD CONSTRAINT "Menus_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
