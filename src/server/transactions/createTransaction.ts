import { transactionSchemaRoute } from '@/app/api/transactions/transaction.schema'
import { prisma } from '@/constants'
import { FormTransaction } from '@/services/queries/transactions/transactions.types'

export const createTransaction = (data: FormTransaction) => {
	try {
		transactionSchemaRoute.parse({ ...data })

		return prisma.transactions.create({
			data: {
				...data,
			},
		})
	} catch (error) {
		console.error('@createTransaction error:', error)
		throw Error
	}
}
