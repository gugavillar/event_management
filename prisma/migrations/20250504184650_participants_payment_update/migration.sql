-- AlterTable
ALTER TABLE `participants_payments` MODIFY `paymentValue` DECIMAL(65, 30) NULL,
    MODIFY `paymentType` ENUM('CARD', 'PIX', 'CASH', 'DONATION') NULL;
