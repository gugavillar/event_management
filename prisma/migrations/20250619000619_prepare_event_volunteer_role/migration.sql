-- 👇 Criação da tabela principal
CREATE TABLE `event_volunteer_roles` (
  `id` VARCHAR(191) NOT NULL,
  `eventId` VARCHAR(191) NOT NULL,
  `volunteerRoleId` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  UNIQUE INDEX `event_volunteer_roles_eventId_volunteerRoleId_key`(`eventId`, `volunteerRoleId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 👇 Tabela de relação voluntário <-> função no evento
CREATE TABLE `_VolunteersOnEventRoles` (
  `A` VARCHAR(191) NOT NULL,
  `B` VARCHAR(191) NOT NULL,

  UNIQUE INDEX `_VolunteersOnEventRoles_AB_unique`(`A`, `B`),
  INDEX `_VolunteersOnEventRoles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 👇 Tabela de relação líder <-> função no evento (vários líderes possíveis)
CREATE TABLE `_LeadersOnEventRoles` (
  `A` VARCHAR(191) NOT NULL,
  `B` VARCHAR(191) NOT NULL,

  UNIQUE INDEX `_LeadersOnEventRoles_AB_unique`(`A`, `B`),
  INDEX `_LeadersOnEventRoles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Foreign Keys
ALTER TABLE `event_volunteer_roles`
  ADD CONSTRAINT `event_volunteer_roles_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_volunteer_roles_volunteerRoleId_fkey` FOREIGN KEY (`volunteerRoleId`) REFERENCES `volunteers_roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `_VolunteersOnEventRoles`
  ADD CONSTRAINT `_VolunteersOnEventRoles_A_fkey` FOREIGN KEY (`A`) REFERENCES `event_volunteer_roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_VolunteersOnEventRoles_B_fkey` FOREIGN KEY (`B`) REFERENCES `volunteers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `_LeadersOnEventRoles`
  ADD CONSTRAINT `_LeadersOnEventRoles_A_fkey` FOREIGN KEY (`A`) REFERENCES `event_volunteer_roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_LeadersOnEventRoles_B_fkey` FOREIGN KEY (`B`) REFERENCES `volunteers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 👇 Copia os dados existentes
-- (1) Cria os registros em event_volunteer_roles
INSERT IGNORE INTO `event_volunteer_roles` (`id`, `eventId`, `volunteerRoleId`, `createdAt`, `updatedAt`)
SELECT
  UUID(), v.eventId, vr.id, NOW(), NOW()
FROM `_VolunteerToVolunteerRole` AS link
JOIN `volunteers` v ON link.A = v.id
JOIN `volunteers_roles` vr ON link.B = vr.id
GROUP BY v.eventId, vr.id;

-- (2) Relaciona voluntários aos event_volunteer_roles
INSERT IGNORE INTO `_VolunteersOnEventRoles` (`A`, `B`)
SELECT
  (
    SELECT evr.id FROM `event_volunteer_roles` evr
    WHERE evr.eventId = v.eventId AND evr.volunteerRoleId = vr.id
    LIMIT 1
  ),
  v.id
FROM `_VolunteerToVolunteerRole` link
JOIN `volunteers` v ON link.A = v.id
JOIN `volunteers_roles` vr ON link.B = vr.id;

-- (3) Relaciona líderes
INSERT IGNORE INTO `_LeadersOnEventRoles` (`A`, `B`)
SELECT
  (
    SELECT evr.id FROM `event_volunteer_roles` evr
    WHERE evr.eventId = v.eventId AND evr.volunteerRoleId = vr.id
    LIMIT 1
  ),
  vr.leaderId
FROM `volunteers_roles` vr
JOIN `_VolunteerToVolunteerRole` link ON vr.id = link.B
JOIN `volunteers` v ON v.id = link.A
WHERE vr.leaderId IS NOT NULL;
