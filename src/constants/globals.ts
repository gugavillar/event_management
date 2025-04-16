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

export const PARTICIPANTS_HEADER_TEMPLATE = [
	'Nome', // 0
	'Email', // 1
	'Chamado', // 2
	'Nascimento', // 3
	'Contato', // 4
	'Estado civil', // 5
	'Rua', // 6
	'Bairro', // 7
	'Número', // 8
	'Cidade', // 9
	'Estado', // 10
	'Parente', // 11
	'Contato parente', // 12
	'Parentesco', // 13
	'Anfitrião', // 14
	'Contato anfitrião', // 15
]

export const FILES_TYPES = {
	xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}
