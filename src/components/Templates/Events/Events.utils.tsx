import { format } from 'date-fns'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import { Tooltip } from '@/components/Atoms'
import { GenderType } from '@/constants'
import { currencyValue } from '@/formatters'
import { EventsAPI } from '@/services/queries/events/event.type'

export const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Gênero',
		accessor: 'gender',
	},
	{
		label: 'Data inicial',
		accessor: 'initialDate',
	},
	{
		label: 'Data final',
		accessor: 'finalDate',
	},
	{
		label: 'R$ Participante',
		accessor: 'participantPrice',
	},
	{
		label: 'R$ Voluntário',
		accessor: 'volunteerPrice',
	},
	{
		label: '',
		accessor: 'actions',
	},
]

export const formatTableData = (
	data: Array<EventsAPI> | undefined,
	handleOpenDrawer: (id: EventsAPI['id']) => void,
	handleDeleteEvent: (id: EventsAPI['id']) => void,
) => {
	if (!data) return []

	return data?.map((event) => ({
		...event,
		gender: GenderType[event.gender].label,
		initialDate: format(event.initialDate, 'dd/MM/yyyy'),
		finalDate: format(event.finalDate, 'dd/MM/yyyy'),
		participantPrice: currencyValue(Number(event.participantPrice)),
		volunteerPrice: currencyValue(Number(event.volunteerPrice)),
		actions: (
			<div className="flex space-x-4">
				<div className="hs-tooltip">
					<FaRegEdit
						className="cursor-pointer"
						size={18}
						onClick={() => handleOpenDrawer(event.id)}
					/>
					<Tooltip>Editar</Tooltip>
				</div>
				<div className="hs-tooltip">
					<MdDelete
						className="cursor-pointer"
						size={18}
						onClick={() => handleDeleteEvent(event.id)}
					/>
					<Tooltip>Excluir</Tooltip>
				</div>
			</div>
		),
	}))
}
