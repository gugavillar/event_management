import { format } from 'date-fns'
import { ArrowLeftRight, FileUser, UserRoundX } from 'lucide-react'

import { Tooltip } from '@/components/Atoms'
import { COMMON_PROPS_TOOLTIPS_BUTTON_TABLE } from '@/constants'
import { formatBirthdate, formatPhone } from '@/formatters'
import type { ParticipantsAPI } from '@/services/queries/participants/participants.type'

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
							<ArrowLeftRight
								className="cursor-pointer"
								onClick={() => handleInterestedModal(participant.id)}
								size={20}
							/>
						}
					>
						Mover para o evento
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
			city: participant.address.city,
			contact: formatPhone(participant.phone),
			createdAt: format(participant.createdAt, 'dd/MM/yyyy - HH:mm'),
			event: participant.event.name,
			id: participant.id,
			name: participant.name,
		}
	})
}
