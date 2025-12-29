import { ROLES } from './status'

export const LIMIT_PER_PAGE = 10
export const LIMIT_PER_PAGE_EDITION = 300

export const MODALS_IDS = {
	// DONATION
	DONATION_CREATE_DRAWER: 'donation_create_drawer',
	DONATION_REMOVE_MODAL: 'donation_remove_modal',

	// EVENT
	EVENT_CREATE_OR_UPDATE_DRAWER: 'event_create_or_update_drawer',
	EVENT_REMOVE_MODAL: 'event_remove_modal',

	// FUNCTION
	FUNCTION_CREATE_OR_UPDATE_MODAL: 'function_create_or_update_modal',
	FUNCTION_REMOVE_MODAL: 'function_remove_modal',
	GENERATE_LIST_GROUP_MODAL: 'generate_list_group_modal',

	// GROUP
	GROUP_DRAWER: 'group_manager',
	GROUP_REMOVE_MODAL: 'group_remove_modal',
	MEETING_ALERT_MODAL: 'meeting_alert_modal',

	// MEETING
	MEETING_CREATE_MODAL: 'meeting_create_modal',
	MEETING_EXPORT_MODAL: 'meeting_export_modal',
	PARTICIPANT_CHECK_IN_MODAL: 'participant_check_in_modal',
	PARTICIPANT_EDIT_DRAWER: 'participant_edit_drawer',
	PARTICIPANT_EXPORT_MODAL: 'participant_export_modal',
	PARTICIPANT_FILTER_DRAWER: 'participant_filter_drawer',
	PARTICIPANT_FILTER_INTERESTED_DRAWER: 'participant_filter_interested_drawer',
	PARTICIPANT_FILTER_PAYMENT_DRAWER: 'participant_filter_payment_drawer',
	PARTICIPANT_INTERESTED_MODAL: 'participant_interested_modal',
	PARTICIPANT_MODAL_DATA: 'participant_modal_data',
	// PARTICIPANT
	PARTICIPANT_PAYMENT_MODAL: 'participant_payment_modal',
	PARTICIPANT_REMOVE_MODAL: 'participant_remove_modal',
	PARTICIPANT_RETURN_PAYMENT_MODAL: 'participant_return_payment_modal',

	// PIX
	PAYMENT_PIX_MODAL: 'payment_pix_modal',

	// ROOM
	ROOM_DRAWER: 'rooms_manager',
	ROOM_REMOVE_MODAL: 'room_remove_modal',

	// TRANSACTIONS
	TRANSACTION_CREATE_DRAWER: 'transaction_create_drawer',
	TRANSACTION_REMOVE_MODAL: 'transaction_remove_modal',
	USER_BLOCK_MODAL: 'user_block_modal',
	USER_CHANGE_ROLE_MODAL: 'user_change_role_modal',

	// USERS
	USER_CREATE_MODAL: 'user_create_modal',
	USER_RESET_PASSWORD_MODAL: 'user_reset_password_modal',
	VOLUNTEER_ASSIGN_FUNCTION_MODAL: 'volunteer_assign_function_modal',
	VOLUNTEER_CHECK_IN_MODAL: 'volunteer_check_in_modal',
	VOLUNTEER_EDIT_DRAWER: 'volunteer_edit_drawer',

	// VOLUNTEER
	VOLUNTEER_EXPORT_MODAL: 'volunteer_export_modal',
	VOLUNTEER_FILTER_DRAWER: 'volunteer_filter_drawer',
	VOLUNTEER_FILTER_PAYMENT_DRAWER: 'volunteer_filter_payment_drawer',
	VOLUNTEER_MODAL_DATA: 'volunteer_modal_data',
	VOLUNTEER_PAYMENT_MODAL: 'volunteer_payment_modal',
	VOLUNTEER_REMOVE_MODAL: 'volunteer_remove_modal',
	VOLUNTEER_RETURN_PAYMENT_MODAL: 'volunteer_return_payment_modal',
}

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
	city: 'Gravatá',
	key: process.env.NEXT_PUBLIC_PIX_KEY ?? '',
	name: 'Igreja Anglicana Vida',
}

export const NO_FUNCTION = {
	label: 'Sem função',
	value: 'Sem funcao',
}

export const LINE_COLOR = {
	payment: '#fffbeb',
	withdrew: '#fee2e2',
}

export const IMAGES_FORMS = {
	'cursilho-feminino': '/cursilho_feminino.webp',
	'cursilho-masculino': '/cursilho_masculino.webp',
	happening: '/happening.webp',
}

export const PAGES_ROLES = {
	'/dashboard': [ROLES.ADMIN, ROLES.USER],
	'/doacoes': [ROLES.ADMIN],
	'/eventos': [ROLES.ADMIN, ROLES.USER],
	'/grupos': [ROLES.ADMIN, ROLES.USER],
	'/participantes/lista-interessados': [ROLES.ADMIN, ROLES.USER],
	'/participantes/listagem': [ROLES.ADMIN, ROLES.USER],
	'/participantes/pagamentos': [ROLES.ADMIN, ROLES.USER],
	'/quartos': [ROLES.ADMIN, ROLES.USER],
	'/reunioes': [ROLES.ADMIN, ROLES.USER],
	'/transacoes': [ROLES.ADMIN],
	'/usuarios': [ROLES.ADMIN],
	'/voluntarios/funcoes': [ROLES.ADMIN, ROLES.USER],
	'/voluntarios/listagem': [ROLES.ADMIN, ROLES.USER],
	'/voluntarios/pagamentos': [ROLES.ADMIN, ROLES.USER],
}
