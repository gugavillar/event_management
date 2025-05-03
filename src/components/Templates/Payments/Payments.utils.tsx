import { PaymentTag } from '@/components/Atoms'
import { PaymentTypeAPI } from '@/constants'
import { formatPhone } from '@/formatters'
import { ParticipantsFromAPI } from '@/services/queries/participants/participants.type'
import { VolunteersFromAPI } from '@/services/queries/volunteers/volunteers.type'

export const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Telefone',
		accessor: 'phone',
	},
	{
		label: 'Tipo de colaborador',
		accessor: 'collaboratorType',
	},
	{
		label: 'Valor pago',
		accessor: 'valuePayed',
	},
	{
		label: 'Status',
		accessor: 'payment',
	},
]

export const formatTableData = (
	participants?: ParticipantsFromAPI[],
	volunteers?: VolunteersFromAPI[],
) => {
	if (!participants || !volunteers) return []
	const formattedParticipants = participants.map((participant) => ({
		id: participant.id,
		name: participant.name,
		phone: formatPhone(participant.contact),
		collaboratorType: 'Participante',
		valuePayed: 'R$ 0,00',
		payment: <PaymentTag status={PaymentTypeAPI.CASH} />,
	}))
	const formattedVolunteers = volunteers.map((volunteer) => ({
		id: volunteer.id,
		name: volunteer.name,
		phone: formatPhone(volunteer.contact),
		collaboratorType: 'Voluntário',
		valuePayed: 'R$ 0,00',
		payment: <PaymentTag status={PaymentTypeAPI.CASH} />,
	}))

	return [...formattedParticipants, ...formattedVolunteers]
}
