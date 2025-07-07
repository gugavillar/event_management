import { format } from 'date-fns'
import {
	BriefcaseBusiness,
	FileUser,
	SquarePen,
	TicketCheck,
	UserRoundX,
} from 'lucide-react'

import { FunctionTag, StatusTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS, LINE_COLOR } from '@/constants'
import { formatBirthdate, formatPhone } from '@/formatters'
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
		accessor: 'phone',
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
		label: 'Data de inscrição',
		accessor: 'createdAt',
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
	handleShowVolunteer: (id: VolunteersAPI['id']) => void,
) => {
	if (!data) return []

	return data?.map((volunteer) => {
		const isWithdrew = volunteer.checkIn === CHECK_IN_STATUS.WITHDREW
		return {
			...(isWithdrew && {
				backgroundColor: LINE_COLOR.withdrew,
			}),
			id: volunteer.id,
			name: volunteer.name,
			role: (
				<div className="flex gap-2">
					{!volunteer.eventRoles?.length ? (
						<FunctionTag />
					) : (
						volunteer.eventRoles.map((role) => (
							<FunctionTag
								key={role.id}
								status={role.volunteerRole.role}
								isLeader={role.leaders.some(({ id }) => id === volunteer.id)}
							/>
						))
					)}
				</div>
			),
			phone: formatPhone(volunteer.phone),
			birthdate: formatBirthdate(
				volunteer.birthdate,
				volunteer.event.finalDate,
			),
			city: volunteer.address.city,
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
			createdAt: format(volunteer.createdAt, 'dd/MM/yyyy - HH:mm'),
			actions: (
				<div className="flex space-x-4">
					<div className="hs-tooltip">
						<FileUser
							className="cursor-pointer"
							size={20}
							onClick={() => handleShowVolunteer(volunteer.id)}
						/>
						<Tooltip>Informações</Tooltip>
					</div>
					<div className="hs-tooltip">
						<SquarePen
							className="cursor-pointer"
							size={20}
							onClick={() => handleEditVolunteer(volunteer.id)}
						/>
						<Tooltip>Editar</Tooltip>
					</div>
					<div className="hs-tooltip">
						<BriefcaseBusiness
							className="cursor-pointer"
							size={20}
							onClick={() => handleAssignFunctionVolunteer(volunteer.id)}
						/>
						<Tooltip>Atribuir função</Tooltip>
					</div>
					<div className="hs-tooltip">
						<TicketCheck
							className="cursor-pointer"
							size={20}
							onClick={() => handleCheckInVolunteer(volunteer.id)}
						/>
						<Tooltip>Check-In</Tooltip>
					</div>
					<div className="hs-tooltip">
						<UserRoundX
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
