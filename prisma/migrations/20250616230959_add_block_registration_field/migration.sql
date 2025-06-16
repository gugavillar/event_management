-- AlterTable
ALTER TABLE `events` ADD COLUMN `isParticipantRegistrationOpen` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isVolunteerRegistrationOpen` BOOLEAN NOT NULL DEFAULT true;
