import { PrismaClient } from '@prisma/client'

export const LIMIT_PER_PAGE = 10

export const MODALS_IDS = {
	// PARTICIPANT
	PARTICIPANT_PAYMENT_MODAL: 'participant_payment_modal',
	PARTICIPANT_REMOVE_MODAL: 'participant_remove_modal',
	PARTICIPANT_CHECK_IN_MODAL: 'participant_check_in_modal',
	PARTICIPANT_EDIT_DRAWER: 'participant_edit_drawer',
	PARTICIPANT_MODAL_DATA: 'participant_modal_data',
	PARTICIPANT_IMPORT_MODAL: 'participant_import_modal',

	GROUP_DRAWER: 'group_manager',
	ROOMS_DRAWER: 'rooms_manager',

	// EVENT
	EVENT_CREATE_OR_UPDATE_DRAWER: 'event_create_or_update_drawer',
	EVENT_REMOVE_MODAL: 'event_remove_modal',

	// FUNCTION
	FUNCTION_CREATE_OR_UPDATE_MODAL: 'function_create_or_update_modal',
	FUNCTION_REMOVE_MODAL: 'function_remove_modal',

	// VOLUNTEER
	VOLUNTEER_IMPORT_MODAL: 'volunteer_import_modal',
	VOLUNTEER_CHECK_IN_MODAL: 'volunteer_check_in_modal',
	VOLUNTEER_REMOVE_MODAL: 'volunteer_remove_modal',
	VOLUNTEER_EDIT_DRAWER: 'volunteer_edit_drawer',
	VOLUNTEER_ASSIGN_FUNCTION_MODAL: 'volunteer_assign_function_modal',
	VOLUNTEER_PAYMENT_MODAL: 'volunteer_payment_modal',

	// USERS
	USER_CREATE_MODAL: 'user_create_modal',
	USER_CHANGE_ROLE_MODAL: 'user_change_role_modal',
	USER_RESET_PASSWORD_MODAL: 'user_reset_password_modal',
	USER_BLOCK_MODAL: 'user_block_modal',
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

export const VOLUNTEERS_HEADER_TEMPLATE = [
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
]

export const TRANSLATE_VOLUNTEERS_HEADER = {
	[VOLUNTEERS_HEADER_TEMPLATE[0]]: 'name',
	[VOLUNTEERS_HEADER_TEMPLATE[1]]: 'email',
	[VOLUNTEERS_HEADER_TEMPLATE[2]]: 'called',
	[VOLUNTEERS_HEADER_TEMPLATE[3]]: 'birthdate',
	[VOLUNTEERS_HEADER_TEMPLATE[4]]: 'contact',
	[VOLUNTEERS_HEADER_TEMPLATE[5]]: 'maritalStatus',
	[VOLUNTEERS_HEADER_TEMPLATE[6]]: 'street',
	[VOLUNTEERS_HEADER_TEMPLATE[7]]: 'neighborhood',
	[VOLUNTEERS_HEADER_TEMPLATE[8]]: 'number',
	[VOLUNTEERS_HEADER_TEMPLATE[9]]: 'city',
	[VOLUNTEERS_HEADER_TEMPLATE[10]]: 'state',
	[VOLUNTEERS_HEADER_TEMPLATE[11]]: 'parent',
	[VOLUNTEERS_HEADER_TEMPLATE[12]]: 'contactParent',
	[VOLUNTEERS_HEADER_TEMPLATE[13]]: 'relationship',
} as const

export enum PRINCIPAL_LINKS {
	LOGIN = '/',
	DASHBOARD = '/dashboard',
	USERS = '/usuarios',
}

export const YES_OR_NO_SELECT_OPTIONS = [
	{ label: 'Sim', value: 'Yes' },
	{ label: 'Não', value: 'No' },
]

export const PAYMENT_METHOD_EXTERNAL_OPTIONS = [
	{ label: 'Dinheiro/Cartão', value: 'Cash/Card' },
	{ label: 'PIX', value: 'PIX' },
]

export const PIX = {
	key: process.env.PIX_KEY ?? '',
	name: 'Igreja Anglicana Vida',
	city: 'Gravatá',
}
