import { LIMIT_PER_PAGE, prisma } from '@/constants'

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
				orderBy: { createdAt: 'asc' },
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
						type: 'INCOME',
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
						type: 'OUTCOME',
					},
				}),
			}),
		])

		return {
			data: transactions,
			sumOfAllIncome: transactionsIncome._sum.amount?.toNumber(),
			sumOfAllOutcome: transactionsOutcome._sum.amount?.toNumber(),
			currentPage: page,
			perPage: LIMIT_PER_PAGE,
			totalCount: totalOfTransactions,
			totalPages: Math.ceil(totalOfTransactions / LIMIT_PER_PAGE),
		}
	} catch (error) {
		console.error('@getTransactions error:', error)
		throw Error
	}
}
