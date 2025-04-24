import { z } from 'zod'

import { prisma } from '@/constants'
import { VolunteersFunctionsForm } from '@/services/queries/volunteers/volunteers.type'

export const createFunction = async ({ role }: VolunteersFunctionsForm) => {
	try {
		z.object({
			role: z.string().min(1).max(255),
		}).parse({ role })

		return await prisma.volunteerRole.create({
			data: { role },
		})
	} catch (error) {
		console.error('@createFunction error:', error)
		throw Error
	}
}
