import { UserLock, UserRoundCog, UserRoundPen } from 'lucide-react'

import { Tooltip, UserTag } from '@/components/Atoms'
import { RolesTypes, USER_STATUS } from '@/constants'
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
		label: 'Status',
		accessor: 'status',
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
	handleResetPassword: (id: UserAPI['id']) => void,
	handleBlockUser: (id: UserAPI['id']) => void,
) => {
	if (!data) return []

	return data
		?.map((user) => ({
			...user,
			firstAccess: user.firstAccess ? 'Sim' : 'Não',
			role: RolesTypes[user.role].label,
			status: (
				<UserTag
					status={!user.deletedAt ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE}
				/>
			),
			actions: (
				<div className="flex space-x-4">
					<div className="hs-tooltip">
						<UserRoundPen
							className="cursor-pointer"
							size={20}
							onClick={() => handleChangeRole(user.id)}
						/>
						<Tooltip>Alterar permissão</Tooltip>
					</div>
					<div className="hs-tooltip">
						<UserRoundCog
							className="cursor-pointer"
							size={20}
							onClick={() => handleResetPassword(user.id)}
						/>
						<Tooltip>Redefinir senha</Tooltip>
					</div>
					<div className="hs-tooltip">
						<UserLock
							className="cursor-pointer"
							size={20}
							onClick={() => handleBlockUser(user.id)}
						/>
						<Tooltip>Bloquear usuário</Tooltip>
					</div>
				</div>
			),
		}))
		.filter((user) => user.id !== userId)
}
