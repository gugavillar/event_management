import { PrismaClient } from '@prisma/client'

export const MODALS_IDS = {
	PARTICIPANT_DRAWER: 'participant_manager',
	VOLUNTEER_DRAWER: 'volunteer_manager',
	PAYMENT_MODAL: 'payment_modal',
	GROUP_DRAWER: 'group_manager',
	EVENT_DRAWER: 'event_manager',
	EVENT_MODAL: 'event_modal',
	ROOMS_DRAWER: 'rooms_manager',
	IMPORT_PARTICIPANTS_MODAL: 'import_participants_modal',
}

export const prisma = new PrismaClient({
	log: ['query', 'error'],
})
