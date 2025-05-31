/*
  Warnings:

  - You are about to drop the column `contact` on the `volunteers` table. All the data in the column will be lost.
  - You are about to drop the column `contactParent` on the `volunteers` table. All the data in the column will be lost.
  - You are about to drop the column `maritalStatus` on the `volunteers` table. All the data in the column will be lost.
  - You are about to drop the column `parent` on the `volunteers` table. All the data in the column will be lost.
  - You are about to drop the column `relationship` on the `volunteers` table. All the data in the column will be lost.
  - Added the required column `community` to the `volunteers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `volunteers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relative` to the `volunteers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relativePhone` to the `volunteers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `volunteers` DROP COLUMN `contact`,
    DROP COLUMN `contactParent`,
    DROP COLUMN `maritalStatus`,
    DROP COLUMN `parent`,
    DROP COLUMN `relationship`,
    ADD COLUMN `cell` VARCHAR(191) NULL,
    ADD COLUMN `community` VARCHAR(191) NOT NULL,
    ADD COLUMN `health` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `relative` VARCHAR(191) NOT NULL,
    ADD COLUMN `relativePhone` VARCHAR(191) NOT NULL;
