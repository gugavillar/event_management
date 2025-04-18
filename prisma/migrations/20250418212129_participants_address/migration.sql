/*
  Warnings:

  - A unique constraint covering the columns `[participantId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `addresses_participantId_key` ON `addresses`(`participantId`);
