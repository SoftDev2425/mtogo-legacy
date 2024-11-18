-- DropForeignKey
ALTER TABLE "Menus" DROP CONSTRAINT "Menus_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Menus" ADD CONSTRAINT "Menus_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
