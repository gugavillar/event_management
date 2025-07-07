import { format } from 'date-fns'
import { FileUser, SquarePen, TicketCheck, UserRoundX } from 'lucide-react'

import { StatusTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS, LINE_COLOR } from '@/constants'
import { formatBirthdate, formatPhone } from '@/formatters'
import { ParticipantsAPI } from '@/services/queries/participants/participants.type'

export const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Telefone',
		accessor: 'contact',
	},
	{
		label: 'Data de nascimento',
		accessor: 'birthdate',
	},
	{
		label: 'Cidade',
		accessor: 'city',
	},
	{
		label: 'Evento',
		accessor: 'event',
	},
	{
		label: 'Status',
		accessor: 'status',
	},
	{
		label: 'Data de inscrição',
		accessor: 'createdAt',
	},
	{
		label: '',
		accessor: 'actions',
	},
]

export const formatTableData = (
	data: Array<ParticipantsAPI> | undefined,
	handleDeleteParticipant: (id: ParticipantsAPI['id']) => void,
	handleCheckInParticipant: (id: ParticipantsAPI['id']) => void,
	handleEditParticipant: (id: ParticipantsAPI['id']) => void,
	handleShowParticipant: (id: ParticipantsAPI['id']) => void,
) => {
	if (!data) return []

	return data?.map((participant) => {
		const isWithdrew = participant.checkIn === CHECK_IN_STATUS.WITHDREW
		return {
			...(isWithdrew && {
				backgroundColor: LINE_COLOR.withdrew,
			}),
			id: participant.id,
			name: participant.name,
			contact: formatPhone(participant.phone),
			birthdate: formatBirthdate(
				participant.birthdate,
				participant.event.finalDate,
			),
			city: participant.address.city,
			event: participant.event.name,
			createdAt: format(participant.createdAt, 'dd/MM/yyyy - HH:mm'),
			status: (
				<StatusTag
					status={
						!participant.checkIn
							? CHECK_IN_STATUS.NOT_ANSWERED
							: participant.checkIn
					}
				/>
			),
			actions: (
				<div className="flex space-x-4">
					<div className="hs-tooltip">
						<FileUser
							className="cursor-pointer"
							size={20}
							onClick={() => handleShowParticipant(participant.id)}
						/>
						<Tooltip>Informações</Tooltip>
					</div>
					<div className="hs-tooltip">
						<SquarePen
							className="cursor-pointer"
							size={20}
							onClick={() => handleEditParticipant(participant.id)}
						/>
						<Tooltip>Editar</Tooltip>
					</div>
					<div className="hs-tooltip">
						<TicketCheck
							className="cursor-pointer"
							size={20}
							onClick={() => handleCheckInParticipant(participant.id)}
						/>
						<Tooltip>Check-In</Tooltip>
					</div>
					<div className="hs-tooltip">
						<UserRoundX
							className="cursor-pointer"
							size={20}
							onClick={() => handleDeleteParticipant(participant.id)}
						/>
						<Tooltip>Excluir</Tooltip>
					</div>
				</div>
			),
		}
	})
}
