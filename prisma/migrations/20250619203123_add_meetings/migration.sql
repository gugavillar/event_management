/*
  Warnings:

  - You are about to drop the column `leaderId` on the `volunteers_roles` table. All the data in the column will be lost.
  - You are about to drop the `_VolunteerToVolunteerRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_VolunteerToVolunteerRole` DROP FOREIGN KEY `_VolunteerToVolunteerRole_A_fkey`;

-- DropForeignKey
ALTER TABLE `_VolunteerToVolunteerRole` DROP FOREIGN KEY `_VolunteerToVolunteerRole_B_fkey`;

-- DropForeignKey
ALTER TABLE `volunteers_roles` DROP FOREIGN KEY `volunteers_roles_leaderId_fkey`;

-- DropIndex
DROP INDEX `volunteers_roles_leaderId_fkey` ON `volunteers_roles`;

-- AlterTable
ALTER TABLE `volunteers_roles` DROP COLUMN `leaderId`;

-- DropTable
DROP TABLE `_VolunteerToVolunteerRole`;

-- CreateTable
CREATE TABLE `Meetings` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MeetingPresence` (
    `id` VARCHAR(191) NOT NULL,
    `volunteerId` VARCHAR(191) NOT NULL,
    `meetingId` VARCHAR(191) NOT NULL,
    `presence` BOOLEAN NOT NULL,
    `justification` BOOLEAN NOT NULL,
    `checkedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `MeetingPresence_volunteerId_meetingId_key`(`volunteerId`, `meetingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Meetings` ADD CONSTRAINT `Meetings_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MeetingPresence` ADD CONSTRAINT `MeetingPresence_volunteerId_fkey` FOREIGN KEY (`volunteerId`) REFERENCES `volunteers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MeetingPresence` ADD CONSTRAINT `MeetingPresence_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `Meetings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
