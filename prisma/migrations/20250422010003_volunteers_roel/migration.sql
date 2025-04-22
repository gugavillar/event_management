-- AlterTable
ALTER TABLE `volunteers` ADD COLUMN `eventRolesId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `EventRoles` (
    `id` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EventRoles_role_key`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventRoles` ADD CONSTRAINT `EventRoles_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `volunteers` ADD CONSTRAINT `volunteers_eventRolesId_fkey` FOREIGN KEY (`eventRolesId`) REFERENCES `EventRoles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
