import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const removeTransactionById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.transactions.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@removeTransactionById error:', error)
		throw Error
	}
}
