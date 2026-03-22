import bcrypt from 'bcryptjs'

export const adminUser = {
	email: 'admin@admin.com.br',
	name: 'Administrador',
	passwordHash: bcrypt.hashSync('12341234', 10),
}
