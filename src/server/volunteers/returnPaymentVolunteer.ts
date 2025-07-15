import { z } from 'zod'

import { prisma } from '@/constants'

export const returnPaymentVolunteer = async (id: string) => {
	try {
		z.object({
			id: z.string().uuid(),
		}).parse({ id })

		return await prisma.volunteerPayment.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@returnPaymentVolunteer error:', error)
		throw Error
	}
}
