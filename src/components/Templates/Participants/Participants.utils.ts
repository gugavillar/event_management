import { format } from 'date-fns'

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
		label: 'Status',
		accessor: 'status',
	},
]

export const formatTableData = (data: Array<ParticipantsFromAPI>) => {
	if (!data) return []

	return data?.map((participant) => ({
		id: participant.id,
		name: participant.name,
		contact: formatPhone(participant.contact),
		birthdate: format(participant.birthdate, 'dd/MM/yyyy'),
		city: participant.Address.map((address) => address.city),
	}))
}
