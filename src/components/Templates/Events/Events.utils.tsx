'use client'
import { format } from 'date-fns'
import { CalendarMinus, Link2, SquarePen } from 'lucide-react'

import { Dropdown, Tooltip } from '@/components/Atoms'
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
	handleOpenLink: (
		id: EventsAPI['id'],
		type: 'participante' | 'voluntario',
	) => void,
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
					<Dropdown label={<Link2 className="cursor-pointer" size={18} />}>
						<>
							<p
								className="block cursor-pointer select-none rounded-lg px-3 py-2 hover:bg-gray-100"
								onClick={() => handleOpenLink(event.id, 'participante')}
							>
								Participante
							</p>
							<p
								className="block cursor-pointer select-none rounded-lg px-3 py-2 hover:bg-gray-100"
								onClick={() => handleOpenLink(event.id, 'voluntario')}
							>
								Voluntário
							</p>
						</>
					</Dropdown>
					<Tooltip>Links de inscrição</Tooltip>
				</div>
				<div className="hs-tooltip">
					<SquarePen
						className="cursor-pointer"
						size={18}
						onClick={() => handleOpenDrawer(event.id)}
					/>
					<Tooltip>Editar</Tooltip>
				</div>
				<div className="hs-tooltip">
					<CalendarMinus
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
