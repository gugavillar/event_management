import { PrismaClient } from '@prisma/client'

export const LIMIT_PER_PAGE = 10

export const MODALS_IDS = {
	// PARTICIPANT
	PARTICIPANT_PAYMENT_MODAL: 'participant_payment_modal',
	PARTICIPANT_REMOVE_MODAL: 'participant_remove_modal',
	PARTICIPANT_CHECK_IN_MODAL: 'participant_check_in_modal',
	PARTICIPANT_EDIT_DRAWER: 'participant_edit_drawer',
	PARTICIPANT_MODAL_DATA: 'participant_modal_data',
	PARTICIPANT_EXPORT_MODAL: 'participant_export_modal',
	PARTICIPANT_INTERESTED_MODAL: 'participant_interested_modal',

	// GROUP
	GROUP_DRAWER: 'group_manager',
	GROUP_REMOVE_MODAL: 'group_remove_modal',

	// ROOM
	ROOM_DRAWER: 'rooms_manager',
	ROOM_REMOVE_MODAL: 'room_remove_modal',

	// EVENT
	EVENT_CREATE_OR_UPDATE_DRAWER: 'event_create_or_update_drawer',
	EVENT_REMOVE_MODAL: 'event_remove_modal',

	// FUNCTION
	FUNCTION_CREATE_OR_UPDATE_MODAL: 'function_create_or_update_modal',
	FUNCTION_REMOVE_MODAL: 'function_remove_modal',

	// VOLUNTEER
	VOLUNTEER_EXPORT_MODAL: 'volunteer_export_modal',
	VOLUNTEER_CHECK_IN_MODAL: 'volunteer_check_in_modal',
	VOLUNTEER_REMOVE_MODAL: 'volunteer_remove_modal',
	VOLUNTEER_EDIT_DRAWER: 'volunteer_edit_drawer',
	VOLUNTEER_ASSIGN_FUNCTION_MODAL: 'volunteer_assign_function_modal',
	VOLUNTEER_PAYMENT_MODAL: 'volunteer_payment_modal',
	VOLUNTEER_MODAL_DATA: 'volunteer_modal_data',

	// USERS
	USER_CREATE_MODAL: 'user_create_modal',
	USER_CHANGE_ROLE_MODAL: 'user_change_role_modal',
	USER_RESET_PASSWORD_MODAL: 'user_reset_password_modal',
	USER_BLOCK_MODAL: 'user_block_modal',

	// MEETING
	MEETING_CREATE_MODAL: 'meeting_create_modal',
	MEETING_EXPORT_MODAL: 'meeting_export_modal',
	MEETING_ALERT_MODAL: 'meeting_alert_modal',

	// PIX
	PAYMENT_PIX_MODAL: 'payment_pix_modal',
}

export const prisma = new PrismaClient({
	log: ['query', 'error'],
})

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
	key: process.env.NEXT_PUBLIC_PIX_KEY ?? '',
	name: 'Igreja Anglicana Vida',
	city: 'Gravatá',
}

export const NO_FUNCTION = {
	label: 'Sem função',
	value: 'Sem funcao',
}

export const LINE_COLOR = {
	payment: '#fffbeb',
	withdrew: '#fee2e2',
	interested: '#e9d5ff',
}
