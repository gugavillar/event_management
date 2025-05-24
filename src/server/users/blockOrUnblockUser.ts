import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/constants'

export const blockOrUnblockUser = async (
	userId: string,
	userIdLogged: string,
	isBlock: boolean,
) => {
	try {
		z.object({
			userId: z.string().uuid(),
			userIdLogged: z.string().uuid(),
		}).parse({ userId, userIdLogged })

		const isSameUser = userId === userIdLogged

		if (isSameUser) {
			return NextResponse.json(
				{
					error: 'Você não pode bloquear sua própria conta',
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
				deletedAt: isBlock ? new Date() : null,
			},
		})
	} catch (error) {
		console.error('@blockOrUnblockUser error:', error)
		throw Error
	}
}
