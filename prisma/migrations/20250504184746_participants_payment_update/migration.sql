/*
  Warnings:

  - Made the column `paymentValue` on table `participants_payments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `participants_payments` MODIFY `paymentValue` DECIMAL(65, 30) NOT NULL;
