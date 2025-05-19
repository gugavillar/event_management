import { GrUserSettings } from 'react-icons/gr'

import { Tooltip } from '@/components/Atoms'
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
	{
		label: '',
		accessor: 'actions',
	},
]

export const formatTableData = (
	data: Array<UserAPI> | undefined,
	userId: string,
	handleChangeRole: (id: UserAPI['id']) => void,
) => {
	if (!data) return []

	return data
		?.map((user) => ({
			...user,
			firstAccess: user.firstAccess ? 'Sim' : 'Não',
			role: RolesTypes[user.role].label,
			actions: (
				<div className="flex space-x-4">
					<div className="hs-tooltip">
						<GrUserSettings
							className="cursor-pointer"
							size={20}
							onClick={() => handleChangeRole(user.id)}
						/>
						<Tooltip>Alterar permissão</Tooltip>
					</div>
				</div>
			),
		}))
		.filter((user) => user.id !== userId)
}
