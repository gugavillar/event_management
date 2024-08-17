import { PrismaClient } from '@prisma/client'

export enum MODALS_IDS {
	PARTICIPANT_DRAWER = 'participant_manager',
	VOLUNTEER_DRAWER = 'volunteer_manager',
	PAYMENT_MODAL = 'payment_modal',
	GROUP_DRAWER = 'group_manager',
	EVENT_DRAWER = 'event_manager',
	ROOMS_DRAWER = 'rooms_manager',
}

export const prisma = new PrismaClient({
	log: ['query', 'error'],
})
