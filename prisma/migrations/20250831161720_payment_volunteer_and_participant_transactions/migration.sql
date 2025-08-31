-- AlterTable
ALTER TABLE `Transactions` ADD COLUMN `participantPaymentId` VARCHAR(191) NULL,
    ADD COLUMN `volunteerPaymentId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_participantPaymentId_fkey` FOREIGN KEY (`participantPaymentId`) REFERENCES `participants_payments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_volunteerPaymentId_fkey` FOREIGN KEY (`volunteerPaymentId`) REFERENCES `volunteers_payments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
