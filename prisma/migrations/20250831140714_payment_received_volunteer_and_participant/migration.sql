-- AlterTable
ALTER TABLE `participants_payments` ADD COLUMN `paymentReceived` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `volunteers_payments` ADD COLUMN `paymentReceived` DECIMAL(65, 30) NULL;
