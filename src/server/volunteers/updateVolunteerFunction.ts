import { z } from 'zod'

import { prisma } from '@/constants'

export const updateVolunteerFunction = async (roleId: string, id: string) => {
	try {
		z.object({
			id: z.string().uuid(),
			roleId: z.string().uuid(),
		}).parse({ id, roleId })

		return await prisma.volunteer.update({
			where: {
				id,
			},
			data: {
				volunteerRoleId: roleId,
			},
		})
	} catch (error) {
		console.error('@updateVolunteerFunction error:', error)
		throw Error
	}
}
