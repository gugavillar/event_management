import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const removeDonationById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.donation.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@removeDonationById error:', error)
		throw Error
	}
}
