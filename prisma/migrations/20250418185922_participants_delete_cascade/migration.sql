-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_participantId_fkey`;

-- DropIndex
DROP INDEX `addresses_participantId_fkey` ON `addresses`;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `participants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
