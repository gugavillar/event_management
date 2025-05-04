import { PaymentTag } from '@/components/Atoms'
import { PaymentTypeAPI } from '@/constants'
import { formatPhone } from '@/formatters'
import { ParticipantsFromAPI } from '@/services/queries/participants/participants.type'

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
		label: 'Valor evento',
		accessor: 'eventValue',
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

export const formatTableData = (participants?: ParticipantsFromAPI[]) => {
	if (!participants) return []

	return participants.map((participant) => ({
		id: participant.id,
		name: participant.name,
		phone: formatPhone(participant.contact),
		valuePayed: 'R$ 0,00',
		eventValue: 'R$ 0,00',
		payment: <PaymentTag status={PaymentTypeAPI.CASH} />,
	}))
}
