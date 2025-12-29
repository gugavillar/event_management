import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const returnPaymentVolunteer = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
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
