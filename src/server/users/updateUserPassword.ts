import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/constants'
import bcrypt from 'bcryptjs'

export const updateUserPassword = async (
	userIdLogged: string,
	newPassword: string
) => {
	try {
		z.object({
			newPassword: z.string().min(6),
			userIdLogged: z.uuid(),
		}).parse({ newPassword, userIdLogged })

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
				}
			)
		}

		return await prisma.user.update({
			data: {
				firstAccess: false,
				passwordHash: bcrypt.hashSync(newPassword, 10),
			},
			where: {
				id: userIdLogged,
			},
		})
	} catch (error) {
		console.error('@updateUserPassword error:', error)
		throw Error
	}
}
