export enum PaymentTypeAPI {
	CARD = 'CARD',
	PIX = 'PIX',
	CASH = 'CASH',
	DONATION = 'DONATION',
	DONATION_ROMERO = 'DONATION_ROMERO',
	OPEN = 'OPEN',
}

export const PaymentType = {
	[PaymentTypeAPI.CARD]: { label: 'Cartão', value: PaymentTypeAPI.CARD },
	[PaymentTypeAPI.PIX]: { label: 'Pix', value: PaymentTypeAPI.PIX },
	[PaymentTypeAPI.CASH]: { label: 'Dinheiro', value: PaymentTypeAPI.CASH },
	[PaymentTypeAPI.DONATION]: {
		label: 'Doação',
		value: PaymentTypeAPI.DONATION,
	},
	[PaymentTypeAPI.DONATION_ROMERO]: {
		label: 'Doação Romero',
		value: PaymentTypeAPI.DONATION_ROMERO,
	},
	[PaymentTypeAPI.OPEN]: {
		label: 'Em aberto',
		value: PaymentTypeAPI.OPEN,
	},
}

export const PaymentSelectOptions = Object.values(PaymentTypeAPI).map(
	(value) => ({ ...PaymentType[value] }),
)

export enum CHECK_IN_STATUS {
	CONFIRMED = 'CONFIRMED',
	WITHDREW = 'WITHDREW',
	NOT_ANSWERED = 'NOT_ANSWERED',
}

export const StatusType = {
	[CHECK_IN_STATUS.CONFIRMED]: {
		label: 'Confirmado',
		value: CHECK_IN_STATUS.CONFIRMED,
	},
	[CHECK_IN_STATUS.WITHDREW]: {
		label: 'Desistiu',
		value: CHECK_IN_STATUS.WITHDREW,
	},
	[CHECK_IN_STATUS.NOT_ANSWERED]: {
		label: 'Sem resposta',
		value: CHECK_IN_STATUS.NOT_ANSWERED,
	},
}

export const StatusSelectOptions = Object.values(CHECK_IN_STATUS).map(
	(value) => ({ ...StatusType[value] }),
)

export enum GenderTypeAPI {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
	BOTH = 'BOTH',
}

export const GenderType = {
	[GenderTypeAPI.MALE]: { label: 'Masculino', value: GenderTypeAPI.MALE },
	[GenderTypeAPI.FEMALE]: { label: 'Feminino', value: GenderTypeAPI.FEMALE },
	[GenderTypeAPI.BOTH]: { label: 'Ambos', value: GenderTypeAPI.BOTH },
}

export const GenderSelectOptions = Object.values(GenderTypeAPI).map(
	(value) => ({ ...GenderType[value] }),
)

export enum ROLES {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export const RolesTypes = {
	[ROLES.ADMIN]: { label: 'Administrador', value: ROLES.ADMIN },
	[ROLES.USER]: { label: 'Usuário', value: ROLES.USER },
}

export const RolesTypesSelectOptions = Object.values(ROLES).map((value) => ({
	...RolesTypes[value],
}))

export enum USER_STATUS {
	ACTIVE = 'Ativo',
	INACTIVE = 'Inativo',
}

export enum MEMBERS {
	PARTICIPANT = 'PARTICIPANT',
	VOLUNTEER = 'VOLUNTEER',
}

export const MembersTypes = {
	[MEMBERS.PARTICIPANT]: { label: 'Participante', value: MEMBERS.PARTICIPANT },
	[MEMBERS.VOLUNTEER]: { label: 'Voluntário', value: MEMBERS.VOLUNTEER },
}

export const MembersTypesOptions = Object.values(MEMBERS).map((value) => ({
	...MembersTypes[value],
}))

export const MembersTypesOptionsRadio = Object.values(MEMBERS).map((value) => ({
	...MembersTypes[value],
	description:
		value === MEMBERS.PARTICIPANT
			? 'Participando do evento'
			: 'Servindo no evento',
}))

export enum TransactionsType {
	INCOME = 'INCOME',
	OUTCOME = 'OUTCOME',
}

export enum TransactionAmountType {
	ACCOUNT = 'ACCOUNT',
	CASH = 'CASH',
}
