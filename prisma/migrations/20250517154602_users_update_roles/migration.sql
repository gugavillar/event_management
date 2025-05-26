/*
  Warnings:

  - The values [READ,WRITER] on the enum `users_role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `users_name_email_key` ON `users`;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('MASTER', 'USER', 'ADMIN') NOT NULL,
    MODIFY `firstAccess` BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
