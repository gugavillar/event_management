import bcrypt from 'bcryptjs'

import { ROLES } from '../src/constants/status'

export const adminUser = {
	email: 'admin@admin.com.br',
	name: 'Administrador',
	passwordHash: bcrypt.hashSync('12341234', 10),
	role: ROLES.ADMIN,
}
