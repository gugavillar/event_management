import { format } from 'date-fns'
import { ArrowLeftRight, FileUser, SquarePen, TicketCheck, UserRoundX } from 'lucide-react'

import { StatusTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS, COMMON_PROPS_TOOLTIPS_BUTTON_TABLE, LINE_COLOR } from '@/constants'
import { formatBirthdate, formatPhone } from '@/formatters'
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
		accessor: 'contact',
		label: 'Telefone',
	},
	{
		accessor: 'birthdate',
		label: 'Data de nascimento',
	},
	{
		accessor: 'event',
		label: 'Evento',
	},
	{
		accessor: 'status',
		label: 'Status',
	},
	{
		accessor: 'createdAt',
		label: 'Data de inscrição',
	},
	{
		accessor: 'actions',
		label: '',
	},
]

export const formatTableData = (
	data: Array<ParticipantsAPI> | undefined,
	handleDeleteParticipant: (id: ParticipantsAPI['id']) => void,
	handleCheckInParticipant: (id: ParticipantsAPI['id']) => void,
	handleEditParticipant: (id: ParticipantsAPI['id']) => void,
	handleShowParticipant: (id: ParticipantsAPI['id']) => void,
	handleInterestedParticipant: (id: ParticipantsAPI['id']) => void
) => {
	if (!data) return []

	return data?.map((participant) => {
		const isWithdrew = participant.checkIn === CHECK_IN_STATUS.WITHDREW
		return {
			...(isWithdrew && {
				backgroundColor: LINE_COLOR.withdrew,
			}),
			actions: (
				<div className="flex space-x-4">
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={
							<FileUser className="cursor-pointer" onClick={() => handleShowParticipant(participant.id)} size={20} />
						}
					>
						Informações
					</Tooltip>
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={
							<SquarePen className="cursor-pointer" onClick={() => handleEditParticipant(participant.id)} size={20} />
						}
					>
						Editar
					</Tooltip>
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={
							<TicketCheck
								className="cursor-pointer"
								onClick={() => handleCheckInParticipant(participant.id)}
								size={20}
							/>
						}
					>
						Check-In
					</Tooltip>
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={
							<ArrowLeftRight
								className="cursor-pointer"
								onClick={() => handleInterestedParticipant(participant.id)}
								size={20}
							/>
						}
					>
						Mover para lista de interessados
					</Tooltip>
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={
							<UserRoundX
								className="cursor-pointer"
								onClick={() => handleDeleteParticipant(participant.id)}
								size={20}
							/>
						}
					>
						Excluir
					</Tooltip>
				</div>
			),
			birthdate: formatBirthdate(participant.birthdate, participant.event.finalDate),
			called: participant.called,
			city: participant.address.city,
			contact: formatPhone(participant.phone),
			createdAt: format(participant.createdAt, 'dd/MM/yyyy - HH:mm'),
			event: participant.event.name,
			id: participant.id,
			name: participant.name,
			status: <StatusTag status={!participant.checkIn ? CHECK_IN_STATUS.NOT_ANSWERED : participant.checkIn} />,
		}
	})
}
