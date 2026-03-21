/*
  Warnings:

  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(8))` to `VarChar(300)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `role` VARCHAR(300) NULL;
