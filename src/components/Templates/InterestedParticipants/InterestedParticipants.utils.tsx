import { ArrowLeftRight, FileUser, UserRoundX } from 'lucide-react'

import { Tooltip } from '@/components/Atoms'
import { formatBirthdate, formatPhone } from '@/formatters'
import type { ParticipantsAPI } from '@/services/queries/participants/participants.type'
import { format } from 'date-fns'

export const HEADER_LABELS = [
	{
		accessor: 'name',
		label: 'Nome',
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
		accessor: 'city',
		label: 'Cidade',
	},
	{
		accessor: 'event',
		label: 'Evento',
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
	handleShowParticipant: (id: ParticipantsAPI['id']) => void,
	handleInterestedModal: (id: ParticipantsAPI['id']) => void,
	handleDeleteParticipant: (id: ParticipantsAPI['id']) => void
) => {
	if (!data) return []

	return data?.map((participant) => {
		return {
			actions: (
				<div className="flex space-x-4">
					<div className="hs-tooltip">
						<FileUser
							className="cursor-pointer"
							onClick={() => handleShowParticipant(participant.id)}
							size={20}
						/>
						<Tooltip>Informações</Tooltip>
					</div>
					<div className="hs-tooltip">
						<ArrowLeftRight
							className="cursor-pointer"
							onClick={() => handleInterestedModal(participant.id)}
							size={20}
						/>
						<Tooltip>Mover para o evento</Tooltip>
					</div>
					<div className="hs-tooltip">
						<UserRoundX
							className="cursor-pointer"
							onClick={() => handleDeleteParticipant(participant.id)}
							size={20}
						/>
						<Tooltip>Excluir</Tooltip>
					</div>
				</div>
			),
			birthdate: formatBirthdate(
				participant.birthdate,
				participant.event.finalDate
			),
			city: participant.address.city,
			contact: formatPhone(participant.phone),
			createdAt: format(participant.createdAt, 'dd/MM/yyyy - HH:mm'),
			event: participant.event.name,
			id: participant.id,
			name: participant.name,
		}
	})
}
