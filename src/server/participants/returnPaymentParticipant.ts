import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const returnPaymentParticipant = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.participantPayment.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@returnPaymentParticipant error:', error)
		throw Error
	}
}
