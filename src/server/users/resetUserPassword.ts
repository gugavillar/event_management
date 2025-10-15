import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/constants'

export const resetUserPassword = async (userId: string, userIdLogged: string) => {
	try {
		z.object({
			userId: z.uuid(),
			userIdLogged: z.uuid(),
		}).parse({ userId, userIdLogged })

		const isSameUser = userId === userIdLogged

		if (isSameUser) {
			return NextResponse.json(
				{
					error: 'Você não pode redefinir sua própria senha',
				},
				{
					status: 400,
				}
			)
		}

		return await prisma.user.update({
			data: {
				firstAccess: true,
				passwordHash: bcrypt.hashSync('123456', 10),
			},
			where: {
				id: userId,
			},
		})
	} catch (error) {
		console.error('@resetUserPassword error:', error)
		throw Error
	}
}
