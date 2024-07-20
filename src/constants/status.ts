export enum PaymentTypeAPI {
	CARD = 1,
	PIX = 2,
	CASH = 3,
	DONATION = 4,
}

export const PaymentType = {
	'1': { label: 'Cartão', value: PaymentTypeAPI.CARD },
	'2': { label: 'Pix', value: PaymentTypeAPI.PIX },
	'3': { label: 'Dinheiro', value: PaymentTypeAPI.CASH },
	'4': { label: 'Doação', value: PaymentTypeAPI.DONATION },
}

export enum StatusTypeAPI {
	CONFIRMED = 1,
	NOT_CONFIRMED = 2,
}

export const StatusType = {
	'1': { label: 'Confirmado', value: StatusTypeAPI.CONFIRMED },
	'2': { label: 'Desistiu', value: StatusTypeAPI.NOT_CONFIRMED },
}

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

export enum CollaboratorTypeAPI {
	VOLUNTARY = 1,
	PARTICIPANT = 2,
}

export const CollaboratorType = {
	'1': { label: 'Voluntário', value: CollaboratorTypeAPI.VOLUNTARY },
	'2': { label: 'Participante', value: CollaboratorTypeAPI.PARTICIPANT },
}
