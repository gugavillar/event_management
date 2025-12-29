import { NextResponse } from 'next/server'
import { z } from 'zod'

import { ROLES } from '@/constants'
import { prisma } from '@/lib/prisma'

export const updateUserRole = async (userId: string, role: ROLES, userIdLogged: string) => {
	try {
		z.object({
			role: z.enum([ROLES.ADMIN, ROLES.USER]),
			userId: z.uuid(),
		}).parse({ role, userId })

		const isSameUser = userId === userIdLogged

		if (isSameUser) {
			return NextResponse.json(
				{
					error: 'Você não pode alterar sua própria permissão',
				},
				{
					status: 400,
				}
			)
		}

		return await prisma.user.update({
			data: {
				role,
			},
			where: {
				id: userId,
			},
		})
	} catch (error) {
		console.error('@updateUserRole error:', error)
		throw Error
	}
}
