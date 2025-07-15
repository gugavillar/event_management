import { z } from 'zod'

import { prisma } from '@/constants'

export const returnPaymentParticipant = async (id: string) => {
	try {
		z.object({
			id: z.string().uuid(),
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
