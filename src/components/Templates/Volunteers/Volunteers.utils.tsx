import { differenceInYears, format } from 'date-fns'
import { FaRegEdit } from 'react-icons/fa'
import { LuTicketCheck } from 'react-icons/lu'
import { MdAssignmentInd, MdDelete } from 'react-icons/md'

import { FunctionTag, StatusTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS } from '@/constants'
import { formatPhone } from '@/formatters'
import { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'

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
	data: Array<VolunteersAPI> | undefined,
	handleCheckInVolunteer: (id: VolunteersAPI['id']) => void,
	handleDeleteVolunteer: (id: VolunteersAPI['id']) => void,
	handleEditVolunteer: (id: VolunteersAPI['id']) => void,
	handleAssignFunctionVolunteer: (id: VolunteersAPI['id']) => void,
) => {
	if (!data) return []

	return data?.map((volunteer) => {
		return {
			id: volunteer.id,
			name: volunteer.name,
			role: <FunctionTag status={volunteer?.volunteerRole?.role} />,
			phone: formatPhone(volunteer.phone),
			birthdate: `${format(volunteer.birthdate, 'dd/MM/yyyy')} - ${differenceInYears(new Date(), volunteer.birthdate)} anos`,
			city: volunteer.Address.city,
			event: volunteer.event.name,
			status: (
				<StatusTag
					status={
						!volunteer.checkIn
							? CHECK_IN_STATUS.NOT_ANSWERED
							: volunteer.checkIn
					}
				/>
			),
			actions: (
				<div className="flex space-x-4">
					<div className="hs-tooltip">
						<FaRegEdit
							className="cursor-pointer"
							size={20}
							onClick={() => handleEditVolunteer(volunteer.id)}
						/>
						<Tooltip>Editar</Tooltip>
					</div>
					<div className="hs-tooltip">
						<MdAssignmentInd
							className="cursor-pointer"
							size={20}
							onClick={() => handleAssignFunctionVolunteer(volunteer.id)}
						/>
						<Tooltip>Atribuir função</Tooltip>
					</div>
					<div className="hs-tooltip">
						<LuTicketCheck
							className="cursor-pointer"
							size={20}
							onClick={() => handleCheckInVolunteer(volunteer.id)}
						/>
						<Tooltip>Check-In</Tooltip>
					</div>
					<div className="hs-tooltip">
						<MdDelete
							className="cursor-pointer"
							size={20}
							onClick={() => handleDeleteVolunteer(volunteer.id)}
						/>
						<Tooltip>Excluir</Tooltip>
					</div>
				</div>
			),
		}
	})
}
