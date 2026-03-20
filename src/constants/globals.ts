import { ROLES } from './status'

export const LIMIT_PER_PAGE = 10
export const LIMIT_PER_PAGE_EDITION = 300
export const IS_NOT_DEVELOPMENT = process.env.NODE_ENV !== 'development'

export enum PARTICIPANT_MODAL_TYPE {
	CHECK_IN = 'check-in',
	CREATE_OR_EDIT = 'create-or-edit',
	DELETE = 'delete',
	EXPORT = 'export',
	INFO = 'info',
	INTERESTED = 'interested',
	PAYMENT = 'payment',
	RETURN_PAYMENT = 'return_payment',
}

export enum VOLUNTEER_MODAL_TYPE {
	ASSIGN_FUNCTION = 'assign_function',
	CHECK_IN = 'check-in',
	CREATE_OR_EDIT = 'create-or-edit',
	CREATE_OR_EDIT_FUNCTION = 'create-or-edit-function',
	DELETE = 'delete',
	DELETE_FUNCTION = 'delete_function',
	EXPORT = 'export',
	INFO = 'info',
	PAYMENT = 'payment',
	RETURN_PAYMENT = 'return_payment',
}

export enum TRANSACTION_MODAL_TYPE {
	CREATE = 'create',
	DELETE = 'delete',
}

export enum DONATION_MODAL_TYPE {
	CREATE = 'create',
	DELETE = 'delete',
}

export enum MEETING_MODAL_TYPE {
	ALERT = 'alert',
	CREATE = 'create',
	EXPORT = 'export',
}

export enum ROOMS_MODAL_TYPE {
	CREATE_OR_EDIT = 'create-or-edit',
	DELETE = 'delete',
	EXPORT = 'export',
}

export enum GROUPS_MODAL_TYPE {
	CREATE_OR_EDIT = 'create-or-edit',
	DELETE = 'delete',
	EXPORT = 'export',
}

export enum EVENTS_MODAL_TYPE {
	CREATE_OR_EDIT = 'create-or-edit',
	DELETE = 'delete',
}

export enum USERS_MODAL_TYPE {
	BLOCK = 'block',
	CHANGE_ROLE = 'change-role',
	CREATE = 'create',
	RESET_PASSWORD = 'reset-password',
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
	'/participantes/fotos': [ROLES.ADMIN, ROLES.USER],
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

export const COMMON_PROPS_TOOLTIPS_BUTTON_TABLE = {
	side: 'bottom',
	sideOffset: 5,
} as const
