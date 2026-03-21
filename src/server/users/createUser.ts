import bcrypt from 'bcryptjs'

import { UserSchema, type UserSchemaType } from '@/components/Organisms/UserDrawer/UserDrawer.schema'
import { prisma } from '@/lib/prisma'

export const createUser = async (data: UserSchemaType) => {
	try {
		UserSchema.parse({ ...data })

		return await prisma.user.create({
			data: {
				email: data.email,
				name: data.name,
				passwordHash: bcrypt.hashSync('123456', 10),
			},
		})
	} catch (error) {
		console.error('@createUser error:', error)
		throw Error
	}
}
