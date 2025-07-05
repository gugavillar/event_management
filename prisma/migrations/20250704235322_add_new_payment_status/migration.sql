-- AlterTable
ALTER TABLE `participants_payments` MODIFY `paymentType` ENUM('CARD', 'PIX', 'CASH', 'DONATION', 'DONATION_ROMERO') NULL;

-- AlterTable
ALTER TABLE `volunteers_payments` MODIFY `paymentType` ENUM('CARD', 'PIX', 'CASH', 'DONATION', 'DONATION_ROMERO') NULL;
