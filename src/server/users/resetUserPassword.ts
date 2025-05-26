import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/constants'

export const resetUserPassword = async (
	userId: string,
	userIdLogged: string,
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
					error: 'Você não pode redefinir sua própria senha',
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
				passwordHash: bcrypt.hashSync('123456', 10),
				firstAccess: true,
			},
		})
	} catch (error) {
		console.error('@resetUserPassword error:', error)
		throw Error
	}
}
