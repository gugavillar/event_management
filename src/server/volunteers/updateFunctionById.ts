import { z } from 'zod'

import { prisma } from '@/constants'
import { VolunteersFunctionsForm } from '@/services/queries/volunteers/volunteers.type'

export const updateFunctionById = async (
	data: { data: { role: VolunteersFunctionsForm['role'] } },
	id: string,
) => {
	try {
		z.object({
			id: z.string().uuid(),
			role: z.string().min(1).max(255),
		}).parse({ id, ...data })

		return await prisma.volunteerRole.update({
			data,
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@updateFunctionById error:', error)
		throw Error
	}
}
