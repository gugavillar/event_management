/*
  Warnings:

  - A unique constraint covering the columns `[name,email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstAccess` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_email_key` ON `users`;

-- DropIndex
DROP INDEX `users_name_key` ON `users`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `firstAccess` BOOLEAN NOT NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_name_email_key` ON `users`(`name`, `email`);
