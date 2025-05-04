-- DropForeignKey
ALTER TABLE `participants` DROP FOREIGN KEY `participants_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `volunteers` DROP FOREIGN KEY `volunteers_eventId_fkey`;

-- DropIndex
DROP INDEX `participants_eventId_fkey` ON `participants`;

-- DropIndex
DROP INDEX `volunteers_eventId_fkey` ON `volunteers`;

-- CreateTable
CREATE TABLE `participants_payments` (
    `id` VARCHAR(191) NOT NULL,
    `paymentValue` DECIMAL(65, 30) NOT NULL,
    `paymentType` ENUM('CARD', 'PIX', 'CASH', 'DONATION') NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `participantId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `participants` ADD CONSTRAINT `participants_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participants_payments` ADD CONSTRAINT `participants_payments_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participants_payments` ADD CONSTRAINT `participants_payments_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `participants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `volunteers` ADD CONSTRAINT `volunteers_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
