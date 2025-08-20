'use client'
import { format } from 'date-fns'
import { CalendarMinus, Link2, SquarePen } from 'lucide-react'

import { Dropdown, Tooltip } from '@/components/Atoms'
import { GenderType, MEMBERS } from '@/constants'
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
	handleBlockOrOpenRegistration: (
		id: EventsAPI['id'],
		memberType: MEMBERS,
		action: 'open' | 'close',
	) => void,
	handleActivatedOrDeactivatedInterestedList: (
		id: EventsAPI['id'],
		action: 'open' | 'close',
	) => void,
	handleOpenInterestedLink: (id: EventsAPI['id']) => void,
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
								className="block cursor-pointer rounded-lg px-3 py-2 select-none hover:bg-gray-100"
								onClick={() => handleOpenLink(event.id, 'participante')}
							>
								Inscrição participantes
							</p>
							<p
								className="block cursor-pointer rounded-lg px-3 py-2 select-none hover:bg-gray-100"
								onClick={() =>
									handleBlockOrOpenRegistration(
										event.id,
										MEMBERS.PARTICIPANT,
										event.isParticipantRegistrationOpen ? 'close' : 'open',
									)
								}
							>
								{event.isParticipantRegistrationOpen
									? 'Fechar inscrição participantes'
									: 'Abrir inscrição participantes'}
							</p>
							<p
								className="block cursor-pointer rounded-lg px-3 py-2 select-none hover:bg-gray-100"
								onClick={() => handleOpenLink(event.id, 'voluntario')}
							>
								Inscrição voluntários
							</p>
							<p
								className="block cursor-pointer rounded-lg px-3 py-2 select-none hover:bg-gray-100"
								onClick={() =>
									handleBlockOrOpenRegistration(
										event.id,
										MEMBERS.VOLUNTEER,
										event.isVolunteerRegistrationOpen ? 'close' : 'open',
									)
								}
							>
								{event.isVolunteerRegistrationOpen
									? 'Fechar inscrição voluntários'
									: 'Abrir inscrição voluntários'}
							</p>
							<p
								className="block cursor-pointer rounded-lg px-3 py-2 select-none hover:bg-gray-100"
								onClick={() => handleOpenInterestedLink(event.id)}
							>
								Lista de interessados
							</p>
							<p
								className="block cursor-pointer rounded-lg px-3 py-2 select-none hover:bg-gray-100"
								onClick={() =>
									handleActivatedOrDeactivatedInterestedList(
										event.id,
										event.isInterestedListOpen ? 'close' : 'open',
									)
								}
							>
								{event.isInterestedListOpen
									? 'Fechar lista de interessados'
									: 'Abrir lista de interessados'}
							</p>
						</>
					</Dropdown>
					<Tooltip>Ações de links</Tooltip>
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
