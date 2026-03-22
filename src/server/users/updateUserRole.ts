import { NextResponse } from 'next/server'
import { z } from 'zod'

import {
	type UserPermissionDrawerType,
	userPermissionDrawerSchema,
} from '@/components/Organisms/UserPermissionDrawer/UserPermissionDrawer.schema'
import { prisma } from '@/lib/prisma'

export const updateUserRole = async (userId: string, role: UserPermissionDrawerType, userIdLogged: string) => {
	try {
		userPermissionDrawerSchema
			.extend({
				userId: z.uuid(),
			})
			.parse({ ...role, userId })

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
				role: JSON.stringify(role),
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
