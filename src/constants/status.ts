export enum PaymentTypeAPI {
	CARD = 'CARD',
	PIX = 'PIX',
	CASH = 'CASH',
	DONATION = 'DONATION',
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

export enum CollaboratorTypeAPI {
	VOLUNTARY = 'VOLUNTARY',
	PARTICIPANT = 'PARTICIPANT',
}

export const CollaboratorType = {
	[CollaboratorTypeAPI.VOLUNTARY]: {
		label: 'Voluntário',
		value: CollaboratorTypeAPI.VOLUNTARY,
	},
	[CollaboratorTypeAPI.PARTICIPANT]: {
		label: 'Participante',
		value: CollaboratorTypeAPI.PARTICIPANT,
	},
}

export const CollaboratorTypeSelectOptions = Object.values(
	CollaboratorTypeAPI,
).map((value) => ({ ...CollaboratorType[value] }))

export enum TrueOrFalseAPI {
	TRUE = 'TRUE',
	FALSE = 'FALSE',
}

export const TrueOrFalseRadioOptions = [
	{
		label: 'Sim',
		description: 'O limite de pessoas passa a ser 4',
		value: TrueOrFalseAPI.TRUE,
	},
	{
		label: 'Não',
		description: 'O limite de pessoas passa a ser 5',
		value: TrueOrFalseAPI.FALSE,
	},
]
