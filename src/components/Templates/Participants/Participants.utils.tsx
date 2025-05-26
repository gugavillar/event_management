import { differenceInYears, format } from 'date-fns'
import { FaRegEdit } from 'react-icons/fa'
import { FaCircleInfo } from 'react-icons/fa6'
import { LuTicketCheck } from 'react-icons/lu'
import { MdDelete } from 'react-icons/md'

import { StatusTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS } from '@/constants'
import { formatPhone } from '@/formatters'
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
		return {
			id: participant.id,
			name: participant.name,
			contact: formatPhone(participant.phone),
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
						<FaCircleInfo
							className="cursor-pointer"
							size={20}
							onClick={() => handleShowParticipant(participant.id)}
						/>
						<Tooltip>Informações</Tooltip>
					</div>
					<div className="hs-tooltip">
						<FaRegEdit
							className="cursor-pointer"
							size={20}
							onClick={() => handleEditParticipant(participant.id)}
						/>
						<Tooltip>Editar</Tooltip>
					</div>
					<div className="hs-tooltip">
						<LuTicketCheck
							className="cursor-pointer"
							size={20}
							onClick={() => handleCheckInParticipant(participant.id)}
						/>
						<Tooltip>Check-In</Tooltip>
					</div>
					<div className="hs-tooltip">
						<MdDelete
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
