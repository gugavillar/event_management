import { format } from 'date-fns'
import { ArrowLeftRight, FileUser } from 'lucide-react'

import { Tooltip } from '@/components/Atoms'
import { LINE_COLOR } from '@/constants'
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
	handleShowParticipant: (id: ParticipantsAPI['id']) => void,
	handleInterestedModal: (id: ParticipantsAPI['id']) => void,
) => {
	if (!data) return []

	return data?.map((participant) => {
		return {
			backgroundColor: LINE_COLOR.interested,
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
						<ArrowLeftRight
							className="cursor-pointer"
							size={20}
							onClick={() => handleInterestedModal(participant.id)}
						/>
						<Tooltip>Mover para o evento</Tooltip>
					</div>
				</div>
			),
		}
	})
}
