import { PictureInput } from '@/components/Atoms'
import { formatBirthdate } from '@/formatters'
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
		accessor: 'birthdate',
		label: 'Data de nascimento',
	},
	{
		accessor: 'actions',
		label: '',
	},
]

export const formatTableData = (data: Array<ParticipantsAPI> | undefined) => {
	if (!data) return []

	return data?.map((participant) => {
		return {
			actions: (
				<div className="flex space-x-4">
					<PictureInput
						eventId={participant.eventId}
						eventName={participant.event.name}
						participantId={participant.id}
						participantName={participant.name}
					/>
				</div>
			),
			birthdate: formatBirthdate(participant.birthdate, participant.event.finalDate),
			called: participant.called,
			city: participant.address.city,
			id: participant.id,
			name: participant.name,
		}
	})
}
