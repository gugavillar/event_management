/*
  Warnings:

  - You are about to drop the column `volunteerRoleId` on the `volunteers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `volunteers` DROP FOREIGN KEY `volunteers_volunteerRoleId_fkey`;

-- DropIndex
DROP INDEX `volunteers_volunteerRoleId_fkey` ON `volunteers`;

-- AlterTable
ALTER TABLE `volunteers` DROP COLUMN `volunteerRoleId`;

-- AlterTable
ALTER TABLE `volunteers_roles` ADD COLUMN `leaderId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_VolunteerToVolunteerRole` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_VolunteerToVolunteerRole_AB_unique`(`A`, `B`),
    INDEX `_VolunteerToVolunteerRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `volunteers_roles` ADD CONSTRAINT `volunteers_roles_leaderId_fkey` FOREIGN KEY (`leaderId`) REFERENCES `volunteers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_VolunteerToVolunteerRole` ADD CONSTRAINT `_VolunteerToVolunteerRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `volunteers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_VolunteerToVolunteerRole` ADD CONSTRAINT `_VolunteerToVolunteerRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `volunteers_roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
