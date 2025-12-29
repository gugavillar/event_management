import bcrypt from 'bcryptjs'

import { ROLES } from '../src/constants/status'

export const adminUser = {
	name: 'Administrador',
	email: 'admin@admin.com.br',
	passwordHash: bcrypt.hashSync('12341234', 10),
	role: ROLES.ADMIN,
}
