export enum PaymentTypeAPI {
	CARD = 1,
	PIX = 2,
	CASH = 3,
}

export const PaymentType = {
	'1': { label: 'Cartão', value: PaymentTypeAPI.CARD },
	'2': { label: 'Pix', value: PaymentTypeAPI.PIX },
	'3': { label: 'Dinheiro', value: PaymentTypeAPI.CASH },
}

export enum StatusTypeAPI {
	CONFIRMED = 1,
	NOT_CONFIRMED = 2,
}

export const StatusType = {
	'1': { label: 'Confirmado', value: StatusTypeAPI.CONFIRMED },
	'2': { label: 'Desistiu', value: StatusTypeAPI.NOT_CONFIRMED },
}
