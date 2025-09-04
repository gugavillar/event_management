import { TransactionAmountType, TransactionsType } from '@/constants'

export const TRANSACTION_TYPE = [
	{ label: 'Entrada', value: TransactionsType.INCOME },
	{ label: 'Saída', value: TransactionsType.OUTCOME },
]

export const AMOUNT_TYPE = [
	{ label: 'Conta', value: TransactionAmountType.ACCOUNT },
	{ label: 'Dinheiro', value: TransactionAmountType.CASH },
]

export const transactionType = {
	[TRANSACTION_TYPE[0].value]: TRANSACTION_TYPE[0].label,
	[TRANSACTION_TYPE[1].value]: TRANSACTION_TYPE[1].label,
}

export const amountType = {
	[AMOUNT_TYPE[0].value]: AMOUNT_TYPE[0].label,
	[AMOUNT_TYPE[1].value]: AMOUNT_TYPE[1].label,
}
