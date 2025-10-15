import { UserLock, UserRoundCog, UserRoundPen } from 'lucide-react'

import { Tooltip, UserTag } from '@/components/Atoms'
import { RolesTypes, USER_STATUS } from '@/constants'
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
					<div className="hs-tooltip">
						<UserRoundPen
							className="cursor-pointer"
							onClick={() => handleChangeRole(user.id)}
							size={20}
						/>
						<Tooltip>Alterar permissão</Tooltip>
					</div>
					<div className="hs-tooltip">
						<UserRoundCog
							className="cursor-pointer"
							onClick={() => handleResetPassword(user.id)}
							size={20}
						/>
						<Tooltip>Redefinir senha</Tooltip>
					</div>
					<div className="hs-tooltip">
						<UserLock
							className="cursor-pointer"
							onClick={() => handleBlockUser(user.id)}
							size={20}
						/>
						<Tooltip>Bloquear usuário</Tooltip>
					</div>
				</div>
			),
			firstAccess: user.firstAccess ? 'Sim' : 'Não',
			role: RolesTypes[user.role].label,
			status: (
				<UserTag
					status={!user.deletedAt ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE}
				/>
			),
		}))
		.filter((user) => user.id !== userId)
}
