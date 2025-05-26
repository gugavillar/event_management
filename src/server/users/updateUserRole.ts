import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma, ROLES } from '@/constants'

export const updateUserRole = async (
	userId: string,
	role: ROLES,
	userIdLogged: string,
) => {
	try {
		z.object({
			userId: z.string().uuid(),
			role: z.enum([ROLES.ADMIN, ROLES.USER]),
		}).parse({ userId, role })

		const isSameUser = userId === userIdLogged

		if (isSameUser) {
			return NextResponse.json(
				{
					error: 'Você não pode alterar sua própria permissão',
				},
				{
					status: 400,
				},
			)
		}

		return await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				role,
			},
		})
	} catch (error) {
		console.error('@updateUserRole error:', error)
		throw Error
	}
}
