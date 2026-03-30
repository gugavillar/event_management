import bcrypt from 'bcryptjs'

export const adminUser = {
	email: 'admin@admin.com.br',
	name: 'Administrador',
	passwordHash: bcrypt.hashSync('12341234', 10),
	role: JSON.stringify({
		dashboard: true,
		donations: true,
		events: true,
		groups: true,
		meetings: true,
		participants: {
			interest: true,
			list: true,
			payment: true,
			picture: true,
		},
		rooms: true,
		transactions: true,
		users: true,
		volunteers: {
			functions: true,
			list: true,
			payment: true,
		},
	}),
}
