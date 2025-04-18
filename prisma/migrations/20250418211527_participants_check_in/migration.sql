/*
  Warnings:

  - You are about to drop the `participants-check-in` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `participants-check-in` DROP FOREIGN KEY `participants-check-in_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `participants-check-in` DROP FOREIGN KEY `participants-check-in_participantId_fkey`;

-- AlterTable
ALTER TABLE `participants` ADD COLUMN `checkIn` ENUM('CONFIRMED', 'WITHDREW') NULL;

-- DropTable
DROP TABLE `participants-check-in`;
