import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/constants'

export const updateUserPassword = async (
	userIdLogged: string,
	newPassword: string,
) => {
	try {
		z.object({
			userIdLogged: z.string().uuid(),
			newPassword: z.string().min(6),
		}).parse({ userIdLogged, newPassword })

		const isUserExist = await prisma.user.findUnique({
			where: {
				id: userIdLogged,
			},
		})

		if (!isUserExist) {
			return NextResponse.json(
				{
					error: 'Usuário nao encontrado',
				},
				{
					status: 400,
				},
			)
		}

		return await prisma.user.update({
			where: {
				id: userIdLogged,
			},
			data: {
				passwordHash: bcrypt.hashSync(newPassword, 10),
				firstAccess: false,
			},
		})
	} catch (error) {
		console.error('@updateUserPassword error:', error)
		throw Error
	}
}
