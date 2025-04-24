/*
  Warnings:

  - You are about to drop the column `eventRolesId` on the `volunteers` table. All the data in the column will be lost.
  - You are about to drop the `EventRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `EventRoles` DROP FOREIGN KEY `EventRoles_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `volunteers` DROP FOREIGN KEY `volunteers_eventRolesId_fkey`;

-- DropIndex
DROP INDEX `volunteers_eventRolesId_fkey` ON `volunteers`;

-- AlterTable
ALTER TABLE `volunteers` DROP COLUMN `eventRolesId`,
    ADD COLUMN `volunteerRoleId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `EventRoles`;

-- CreateTable
CREATE TABLE `volunteers_roles` (
    `id` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `volunteers_roles_role_key`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `volunteers` ADD CONSTRAINT `volunteers_volunteerRoleId_fkey` FOREIGN KEY (`volunteerRoleId`) REFERENCES `volunteers_roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
