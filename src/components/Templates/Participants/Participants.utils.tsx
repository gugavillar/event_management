import { differenceInYears, format } from 'date-fns'
import { FaRegEdit } from 'react-icons/fa'
import { LuTicketCheck } from 'react-icons/lu'
import { MdDelete } from 'react-icons/md'

import { StatusTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS } from '@/constants'
import { formatPhone } from '@/formatters'
import { ParticipantsFromAPI } from '@/services/queries/participants/participants.type'

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
		label: '',
		accessor: 'actions',
	},
]

export const formatTableData = (
	data: Array<ParticipantsFromAPI> | undefined,
	handleDeleteParticipant: (id: ParticipantsFromAPI['id']) => void,
	handleCheckInParticipant: (
		id: ParticipantsFromAPI['id'],
		eventId: ParticipantsFromAPI['eventId'],
	) => void,
) => {
	if (!data) return []

	return data?.map((participant) => ({
		id: participant.id,
		name: participant.name,
		contact: formatPhone(participant.contact),
		birthdate: `${format(participant.birthdate, 'dd/MM/yyyy')} - ${differenceInYears(new Date(), participant.birthdate)} anos`,
		city: participant.Address.city,
		event: participant.event.name,
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
					<FaRegEdit
						className="cursor-pointer"
						size={18}
						// onClick={() => handleOpenDrawer(event.id)}
					/>
					<Tooltip>Editar</Tooltip>
				</div>
				<div className="hs-tooltip">
					<LuTicketCheck
						className="cursor-pointer"
						size={18}
						onClick={() =>
							handleCheckInParticipant(participant.id, participant.eventId)
						}
					/>
					<Tooltip>Check-In</Tooltip>
				</div>
				<div className="hs-tooltip">
					<MdDelete
						className="cursor-pointer"
						size={18}
						onClick={() => handleDeleteParticipant(participant.id)}
					/>
					<Tooltip>Excluir</Tooltip>
				</div>
			</div>
		),
	}))
}
