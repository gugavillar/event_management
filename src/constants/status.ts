export enum PaymentTypeAPI {
	CARD = 'CARD',
	PIX = 'PIX',
	CASH = 'CASH',
	DONATION = 'DONATION',
}

export const PaymentType = {
	[PaymentTypeAPI.CARD]: { label: 'Cartão', value: PaymentTypeAPI.CARD },
	[PaymentTypeAPI.PIX]: { label: 'Pix', value: PaymentTypeAPI.PIX },
	[PaymentTypeAPI.CASH]: { label: 'Dinheiro', value: PaymentTypeAPI.CASH },
	[PaymentTypeAPI.DONATION]: {
		label: 'Doação',
		value: PaymentTypeAPI.DONATION,
	},
}

export const PaymentSelectOptions = Object.values(PaymentTypeAPI).map(
	(value) => ({ ...PaymentType[value] }),
)

export enum StatusTypeAPI {
	CONFIRMED = 'CONFIRMED',
	NOT_CONFIRMED = 'NOT_CONFIRMED',
}

export const StatusType = {
	[StatusTypeAPI.CONFIRMED]: {
		label: 'Confirmado',
		value: StatusTypeAPI.CONFIRMED,
	},
	[StatusTypeAPI.NOT_CONFIRMED]: {
		label: 'Desistiu',
		value: StatusTypeAPI.NOT_CONFIRMED,
	},
}

export const StatusSelectOptions = Object.values(StatusTypeAPI).map(
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
