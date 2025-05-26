import bcrypt from 'bcryptjs'

import {
	UserSchema,
	UserSchemaType,
} from '@/components/Organisms/UserDrawer/UserDrawer.schema'
import { prisma, ROLES } from '@/constants'

export const createUser = (data: UserSchemaType) => {
	try {
		UserSchema.parse({ ...data })

		return prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				role: data.role as ROLES,
				passwordHash: bcrypt.hashSync('123456', 10),
			},
		})
	} catch (error) {
		console.error('@createUser error:', error)
		throw Error
	}
}
