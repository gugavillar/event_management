/*
  Warnings:

  - A unique constraint covering the columns `[donationId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Donation` ADD COLUMN `type` ENUM('CARD', 'PIX', 'CASH', 'DONATION', 'DONATION_ROMERO') NULL;

-- AlterTable
ALTER TABLE `Transactions` ADD COLUMN `donationId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Transactions_donationId_key` ON `Transactions`(`donationId`);

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_donationId_fkey` FOREIGN KEY (`donationId`) REFERENCES `Donation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
