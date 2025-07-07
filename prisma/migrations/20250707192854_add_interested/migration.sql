-- AlterTable
ALTER TABLE `events` ADD COLUMN `isInterestedListOpen` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `participants` ADD COLUMN `interested` BOOLEAN NULL;
