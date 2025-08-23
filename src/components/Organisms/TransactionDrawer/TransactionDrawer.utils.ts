export const TRANSACTION_TYPE = [
	{ label: 'Entrada', value: 'INCOME' },
	{ label: 'Saída', value: 'OUTCOME' },
]

export const AMOUNT_TYPE = [
	{ label: 'Conta', value: 'ACCOUNT' },
	{ label: 'Dinheiro', value: 'CASH' },
]

export const transactionType = {
	[TRANSACTION_TYPE[0].value]: TRANSACTION_TYPE[0].label,
	[TRANSACTION_TYPE[1].value]: TRANSACTION_TYPE[1].label,
}

export const amountType = {
	[AMOUNT_TYPE[0].value]: AMOUNT_TYPE[0].label,
	[AMOUNT_TYPE[1].value]: AMOUNT_TYPE[1].label,
}
