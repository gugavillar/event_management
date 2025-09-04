import {
	LIMIT_PER_PAGE,
	prisma,
	TransactionAmountType,
	TransactionsType,
} from '@/constants'

export const getTransactions = async (
	eventId: string | null,
	searchTransaction: string | null,
	page = 1,
) => {
	try {
		const skip = (page - 1) * LIMIT_PER_PAGE

		const [
			transactions,
			totalOfTransactions,
			transactionsIncome,
			transactionsOutcome,
			allTransactions,
		] = await Promise.all([
			prisma.transactions.findMany({
				...(eventId && {
					where: {
						eventId,
					},
				}),
				...(searchTransaction && {
					where: {
						description: {
							contains: searchTransaction,
						},
					},
				}),
				include: {
					event: true,
				},
				orderBy: { date: 'asc' },
				skip,
				take: LIMIT_PER_PAGE,
			}),
			prisma.transactions.count({
				...(eventId && {
					where: {
						eventId,
					},
				}),
				...(searchTransaction && {
					where: {
						description: {
							contains: searchTransaction,
						},
					},
				}),
			}),
			prisma.transactions.aggregate({
				_sum: {
					amount: true,
				},
				...(eventId && {
					where: {
						eventId,
						type: TransactionsType.INCOME,
					},
				}),
			}),
			prisma.transactions.aggregate({
				_sum: {
					amount: true,
				},
				...(eventId && {
					where: {
						eventId,
						type: TransactionsType.OUTCOME,
					},
				}),
			}),
			prisma.transactions.findMany({
				...(eventId && {
					where: {
						eventId,
					},
				}),
			}),
		])

		const totalOfAccountAndCash = allTransactions.reduce(
			(total, transaction) => {
				const isAccountIncome =
					transaction.type === TransactionsType.INCOME &&
					transaction.amountType === TransactionAmountType.ACCOUNT
				const isAccountOutcome =
					transaction.type === TransactionsType.OUTCOME &&
					transaction.amountType === TransactionAmountType.ACCOUNT
				const isCashIncome =
					transaction.type === TransactionsType.INCOME &&
					transaction.amountType === TransactionAmountType.CASH
				const isCashOutcome =
					transaction.type === TransactionsType.OUTCOME &&
					transaction.amountType === TransactionAmountType.CASH
				if (isAccountIncome) {
					return {
						...total,
						totalAccountIncome:
							total.totalAccountIncome + Number(transaction.amount),
					}
				}
				if (isAccountOutcome) {
					return {
						...total,
						totalAccountOutcome:
							total.totalAccountOutcome + Number(transaction.amount),
					}
				}
				if (isCashIncome) {
					return {
						...total,
						totalCashIncome: total.totalCashIncome + Number(transaction.amount),
					}
				}
				if (isCashOutcome) {
					return {
						...total,
						totalCashOutcome:
							total.totalCashOutcome + Number(transaction.amount),
					}
				}
				return total
			},
			{
				totalAccountIncome: 0,
				totalAccountOutcome: 0,
				totalCashIncome: 0,
				totalCashOutcome: 0,
			},
		)

		return {
			data: transactions,
			sumOfAllIncome: transactionsIncome._sum.amount?.toNumber(),
			sumOfAllOutcome: transactionsOutcome._sum.amount?.toNumber(),
			currentPage: page,
			perPage: LIMIT_PER_PAGE,
			totalCount: totalOfTransactions,
			totalPages: Math.ceil(totalOfTransactions / LIMIT_PER_PAGE),
			totalOfAccountAndCash,
		}
	} catch (error) {
		console.error('@getTransactions error:', error)
		throw Error
	}
}
