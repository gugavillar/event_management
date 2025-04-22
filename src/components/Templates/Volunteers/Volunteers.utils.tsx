import { differenceInYears, format } from 'date-fns'
import { FaRegEdit } from 'react-icons/fa'
import { LuTicketCheck } from 'react-icons/lu'
import { MdDelete } from 'react-icons/md'

import { FunctionTag, StatusTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS } from '@/constants'
import { formatPhone } from '@/formatters'
import { VolunteersFromAPI } from '@/services/queries/volunteers/volunteers.type'

export const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Função',
		accessor: 'role',
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
	data: Array<VolunteersFromAPI> | undefined,
	// handleDeleteParticipant: (id: VolunteersFromAPI['id']) => void,
	// handleCheckInParticipant: (id: VolunteersFromAPI['id']) => void,
	// handleEditParticipant: (id: VolunteersFromAPI['id']) => void,
) => {
	if (!data) return []

	return data?.map((volunteer) => ({
		id: volunteer.id,
		name: volunteer.name,
		role: <FunctionTag status={volunteer?.role?.role} />,
		contact: formatPhone(volunteer.contact),
		birthdate: `${format(volunteer.birthdate, 'dd/MM/yyyy')} - ${differenceInYears(new Date(), volunteer.birthdate)} anos`,
		city: volunteer.Address.city,
		event: volunteer.event.name,
		status: (
			<StatusTag
				status={
					!volunteer.checkIn ? CHECK_IN_STATUS.NOT_ANSWERED : volunteer.checkIn
				}
			/>
		),
		actions: (
			<div className="flex space-x-4">
				<div className="hs-tooltip">
					<FaRegEdit className="cursor-pointer" size={20} />
					<Tooltip>Editar</Tooltip>
				</div>
				<div className="hs-tooltip">
					<LuTicketCheck className="cursor-pointer" size={20} />
					<Tooltip>Check-In</Tooltip>
				</div>
				<div className="hs-tooltip">
					<MdDelete className="cursor-pointer" size={20} />
					<Tooltip>Excluir</Tooltip>
				</div>
			</div>
		),
	}))
}
