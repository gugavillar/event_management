import { differenceInYears, format } from 'date-fns'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

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
	data: Array<ParticipantsFromAPI>,
	handleDeleteParticipant: (id: ParticipantsFromAPI['id']) => void,
) => {
	if (!data) return []

	return data?.map((participant) => ({
		id: participant.id,
		name: participant.name,
		contact: formatPhone(participant.contact),
		birthdate: `${format(participant.birthdate, 'dd/MM/yyyy')} - ${differenceInYears(new Date(), participant.birthdate)} anos`,
		city: participant.Address.map((address) => address.city),
		event: participant.event.name,
		actions: (
			<div className="flex space-x-4">
				<FaRegEdit
					className="cursor-pointer"
					size={18}
					// onClick={() => handleOpenDrawer(event.id)}
				/>
				<MdDelete
					className="cursor-pointer"
					size={18}
					onClick={() => handleDeleteParticipant(participant.id)}
				/>
			</div>
		),
	}))
}
