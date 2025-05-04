-- CreateTable
CREATE TABLE `volunteers_payments` (
    `id` VARCHAR(191) NOT NULL,
    `paymentValue` DECIMAL(65, 30) NOT NULL,
    `paymentType` ENUM('CARD', 'PIX', 'CASH', 'DONATION') NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `volunteerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `volunteers_payments` ADD CONSTRAINT `volunteers_payments_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `volunteers_payments` ADD CONSTRAINT `volunteers_payments_volunteerId_fkey` FOREIGN KEY (`volunteerId`) REFERENCES `volunteers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
