-- CreateTable
CREATE TABLE `participants-check-in` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('CONFIRMED', 'WITHDREW') NOT NULL,
    `participantId` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `participants-check-in_participantId_eventId_key`(`participantId`, `eventId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `participants-check-in` ADD CONSTRAINT `participants-check-in_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `participants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participants-check-in` ADD CONSTRAINT `participants-check-in_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
