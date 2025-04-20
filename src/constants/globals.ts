import { PrismaClient } from '@prisma/client'

export const MODALS_IDS = {
	VOLUNTEER_DRAWER: 'volunteer_manager',
	PAYMENT_MODAL: 'payment_modal',
	GROUP_DRAWER: 'group_manager',
	EVENT_CREATE_OR_UPDATE_DRAWER: 'event_create_or_update_drawer',
	EVENT_REMOVE_MODAL: 'event_remove_modal',
	PARTICIPANT_REMOVE_MODAL: 'participant_remove_modal',
	PARTICIPANT_CHECK_IN_MODAL: 'participant_check_in_modal',
	PARTICIPANT_EDIT_DRAWER: 'participant_edit_drawer',
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
	'Endereço', // 6
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

export const PARTICIPANTS_HEADER_ADDRESS = [
	PARTICIPANTS_HEADER_TEMPLATE[6],
	PARTICIPANTS_HEADER_TEMPLATE[7],
	PARTICIPANTS_HEADER_TEMPLATE[8],
	PARTICIPANTS_HEADER_TEMPLATE[9],
	PARTICIPANTS_HEADER_TEMPLATE[10],
]

export const TRANSLATE_PARTICIPANTS_HEADER = {
	[PARTICIPANTS_HEADER_TEMPLATE[0]]: 'name',
	[PARTICIPANTS_HEADER_TEMPLATE[1]]: 'email',
	[PARTICIPANTS_HEADER_TEMPLATE[2]]: 'called',
	[PARTICIPANTS_HEADER_TEMPLATE[3]]: 'birthdate',
	[PARTICIPANTS_HEADER_TEMPLATE[4]]: 'contact',
	[PARTICIPANTS_HEADER_TEMPLATE[5]]: 'maritalStatus',
	[PARTICIPANTS_HEADER_TEMPLATE[6]]: 'street',
	[PARTICIPANTS_HEADER_TEMPLATE[7]]: 'neighborhood',
	[PARTICIPANTS_HEADER_TEMPLATE[8]]: 'number',
	[PARTICIPANTS_HEADER_TEMPLATE[9]]: 'city',
	[PARTICIPANTS_HEADER_TEMPLATE[10]]: 'state',
	[PARTICIPANTS_HEADER_TEMPLATE[11]]: 'parent',
	[PARTICIPANTS_HEADER_TEMPLATE[12]]: 'contactParent',
	[PARTICIPANTS_HEADER_TEMPLATE[13]]: 'relationship',
	[PARTICIPANTS_HEADER_TEMPLATE[14]]: 'host',
	[PARTICIPANTS_HEADER_TEMPLATE[15]]: 'contactHost',
} as const

export const FILES_TYPES = {
	xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export const UF = [
	{ label: 'Acre', value: 'AC' },
	{ label: 'Alagoas', value: 'AL' },
	{ label: 'Amapá', value: 'AP' },
	{ label: 'Amazonas', value: 'AM' },
	{ label: 'Bahia', value: 'BA' },
	{ label: 'Ceará', value: 'CE' },
	{ label: 'Distrito Federal', value: 'DF' },
	{ label: 'Espírito Santo', value: 'ES' },
	{ label: 'Goiás', value: 'GO' },
	{ label: 'Maranhão', value: 'MA' },
	{ label: 'Mato Grosso', value: 'MT' },
	{ label: 'Mato Grosso do Sul', value: 'MS' },
	{ label: 'Minas Gerais', value: 'MG' },
	{ label: 'Pará', value: 'PA' },
	{ label: 'Paraíba', value: 'PB' },
	{ label: 'Paraná', value: 'PR' },
	{ label: 'Pernambuco', value: 'PE' },
	{ label: 'Piauí', value: 'PI' },
	{ label: 'Rio de Janeiro', value: 'RJ' },
	{ label: 'Rio Grande do Norte', value: 'RN' },
	{ label: 'Rio Grande do Sul', value: 'RS' },
	{ label: 'Rondônia', value: 'RO' },
	{ label: 'Roraima', value: 'RR' },
	{ label: 'Santa Catarina', value: 'SC' },
	{ label: 'São Paulo', value: 'SP' },
	{ label: 'Sergipe', value: 'SE' },
	{ label: 'Tocantins', value: 'TO' },
]
