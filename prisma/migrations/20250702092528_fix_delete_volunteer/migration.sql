-- DropForeignKey
ALTER TABLE `MeetingPresence` DROP FOREIGN KEY `MeetingPresence_volunteerId_fkey`;

-- AddForeignKey
ALTER TABLE `MeetingPresence` ADD CONSTRAINT `MeetingPresence_volunteerId_fkey` FOREIGN KEY (`volunteerId`) REFERENCES `volunteers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
