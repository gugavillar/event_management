import { RolesTypes } from '@/constants'
import { UserAPI } from '@/services/queries/users/users.type'

export const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Email',
		accessor: 'email',
	},
	{
		label: 'Tipo de acesso',
		accessor: 'role',
	},
	{
		label: 'Primeiro acesso',
		accessor: 'firstAccess',
	},
]

export const formatTableData = (data: Array<UserAPI> | undefined) => {
	if (!data) return []

	return data?.map((user) => ({
		...user,
		firstAccess: user.firstAccess ? 'Sim' : 'Não',
		role: RolesTypes[user.role].label,
	}))
}
