import { UserLock, UserRoundCog, UserRoundPen } from 'lucide-react'

import { Tooltip, UserTag } from '@/components/Atoms'
import { COMMON_PROPS_TOOLTIPS_BUTTON_TABLE, RolesTypes, USER_STATUS } from '@/constants'
import type { UserAPI } from '@/services/queries/users/users.type'

export const HEADER_LABELS = [
	{
		accessor: 'name',
		label: 'Nome',
	},
	{
		accessor: 'email',
		label: 'Email',
	},
	{
		accessor: 'role',
		label: 'Tipo de acesso',
	},
	{
		accessor: 'firstAccess',
		label: 'Primeiro acesso',
	},
	{
		accessor: 'status',
		label: 'Status',
	},
	{
		accessor: 'actions',
		label: '',
	},
]

export const formatTableData = (
	data: Array<UserAPI> | undefined,
	userId: string,
	handleChangeRole: (id: UserAPI['id']) => void,
	handleResetPassword: (id: UserAPI['id']) => void,
	handleBlockUser: (id: UserAPI['id']) => void
) => {
	if (!data) return []

	return data
		?.map((user) => ({
			...user,
			actions: (
				<div className="flex space-x-4">
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={<UserRoundPen className="cursor-pointer" onClick={() => handleChangeRole(user.id)} size={20} />}
					>
						Alterar permissão
					</Tooltip>
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={<UserRoundCog className="cursor-pointer" onClick={() => handleResetPassword(user.id)} size={20} />}
					>
						Redefinir senha
					</Tooltip>
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={<UserLock className="cursor-pointer" onClick={() => handleBlockUser(user.id)} size={20} />}
					>
						Bloquear usuário
					</Tooltip>
				</div>
			),
			firstAccess: user.firstAccess ? 'Sim' : 'Não',
			role: RolesTypes[user.role].label,
			status: <UserTag status={!user.deletedAt ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE} />,
		}))
		.filter((user) => user.id !== userId)
}
