import bcrypt from 'bcryptjs'

import { ROLES } from '@/constants'

export const adminUser = {
	name: 'Administrador',
	email: 'admin@admin.com.br',
	passwordHash: bcrypt.hashSync('123456', 10),
	role: ROLES.ADMIN,
}
