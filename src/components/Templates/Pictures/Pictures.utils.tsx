import { Camera } from 'lucide-react'

import { Tooltip } from '@/components/Atoms'
import { COMMON_PROPS_TOOLTIPS_BUTTON_TABLE } from '@/constants'
import { formatBirthdate } from '@/formatters'
import type { ParticipantsAPI } from '@/services/queries/participants/participants.type'

export const HEADER_LABELS = [
	{
		accessor: 'name',
		label: 'Nome',
	},
	{
		accessor: 'called',
		label: 'Chamado',
	},
	{
		accessor: 'city',
		label: 'Cidade',
	},
	{
		accessor: 'birthdate',
		label: 'Data de nascimento',
	},
	{
		accessor: 'actions',
		label: '',
	},
]

export const formatTableData = (data: Array<ParticipantsAPI> | undefined) => {
	if (!data) return []

	return data?.map((participant) => {
		return {
			actions: (
				<div className="flex space-x-4">
					<Tooltip {...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE} trigger={<Camera className="cursor-pointer" size={20} />}>
						Adicionar foto
					</Tooltip>
				</div>
			),
			birthdate: formatBirthdate(participant.birthdate, participant.event.finalDate),
			called: participant.called,
			city: participant.address.city,
			id: participant.id,
			name: participant.name,
		}
	})
}
