import { SquarePen, Trash2 } from 'lucide-react'

import { Tooltip } from '@/components/Atoms'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'

export const HEADER_LABELS = [
	{
		label: 'Função',
		accessor: 'role',
	},
	{
		label: 'Líder',
		accessor: 'leader',
	},
	{
		label: 'Qtd. voluntários',
		accessor: 'total',
	},
	{
		label: '',
		accessor: 'actions',
	},
]

export const formatTableData = (
	data: Array<VolunteersFunctionsFromAPI> | undefined,
	handleDeleteFunction: (selected: VolunteersFunctionsFromAPI) => void,
	handleEditFunction: (selected: VolunteersFunctionsFromAPI) => void,
) => {
	if (!data) return []

	return data?.map((role) => ({
		id: role.id,
		leader: role?.leader?.name ?? 'Sem líder',
		total: role.volunteers.length,
		role: role.role,
		actions: (
			<div className="flex space-x-4">
				<div className="hs-tooltip">
					<SquarePen
						className="cursor-pointer"
						size={20}
						onClick={() => handleEditFunction(role)}
					/>
					<Tooltip>Editar</Tooltip>
				</div>
				<div className="hs-tooltip">
					<Trash2
						className="cursor-pointer"
						size={20}
						onClick={() => handleDeleteFunction(role)}
					/>
					<Tooltip>Excluir</Tooltip>
				</div>
			</div>
		),
	}))
}
