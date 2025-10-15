import bcrypt from 'bcryptjs'

import { UserSchema, type UserSchemaType } from '@/components/Organisms/UserDrawer/UserDrawer.schema'
import { prisma, type ROLES } from '@/constants'

export const createUser = (data: UserSchemaType) => {
	try {
		UserSchema.parse({ ...data })

		return prisma.user.create({
			data: {
				email: data.email,
				name: data.name,
				passwordHash: bcrypt.hashSync('123456', 10),
				role: data.role as ROLES,
			},
		})
	} catch (error) {
		console.error('@createUser error:', error)
		throw Error
	}
}
