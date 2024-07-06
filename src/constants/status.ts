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
