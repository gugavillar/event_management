import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import { Tooltip } from '@/components/Atoms'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'

export const HEADER_LABELS = [
	{
		label: 'Função',
		accessor: 'role',
	},
	{
		label: '',
		accessor: 'actions',
	},
]

export const formatTableData = (
	data: Array<VolunteersFunctionsFromAPI> | undefined,
	handleDeleteFunction: (selected: VolunteersFunctionsFromAPI) => void,
) => {
	if (!data) return []

	return data?.map((role) => ({
		id: role.id,
		role: role.role,
		actions: (
			<div className="flex space-x-4">
				<div className="hs-tooltip">
					<FaRegEdit className="cursor-pointer" size={20} />
					<Tooltip>Editar</Tooltip>
				</div>
				<div className="hs-tooltip">
					<MdDelete
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
