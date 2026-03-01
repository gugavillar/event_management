import { format } from 'date-fns'
import { BriefcaseBusiness, FileUser, SquarePen, TicketCheck, UserRoundX } from 'lucide-react'

import { FunctionTag, StatusTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS, COMMON_PROPS_TOOLTIPS_BUTTON_TABLE, LINE_COLOR } from '@/constants'
import { formatBirthdate, formatPhone } from '@/formatters'
import type { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'

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
		accessor: 'role',
		label: 'Função',
	},
	{
		accessor: 'phone',
		label: 'Telefone',
	},
	{
		accessor: 'birthdate',
		label: 'Data de nascimento',
	},

	{
		accessor: 'event',
		label: 'Evento',
	},
	{
		accessor: 'status',
		label: 'Status',
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
	data: Array<VolunteersAPI> | undefined,
	handleCheckInVolunteer: (id: VolunteersAPI['id']) => void,
	handleDeleteVolunteer: (id: VolunteersAPI['id']) => void,
	handleEditVolunteer: (id: VolunteersAPI['id']) => void,
	handleAssignFunctionVolunteer: (id: VolunteersAPI['id']) => void,
	handleShowVolunteer: (id: VolunteersAPI['id']) => void
) => {
	if (!data) return []

	return data?.map((volunteer) => {
		const isWithdrew = volunteer.checkIn === CHECK_IN_STATUS.WITHDREW
		return {
			...(isWithdrew && {
				backgroundColor: LINE_COLOR.withdrew,
			}),
			actions: (
				<div className="flex space-x-4">
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={
							<FileUser className="cursor-pointer" onClick={() => handleShowVolunteer(volunteer.id)} size={20} />
						}
					>
						Informações
					</Tooltip>
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={
							<SquarePen className="cursor-pointer" onClick={() => handleEditVolunteer(volunteer.id)} size={20} />
						}
					>
						Editar
					</Tooltip>
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={
							<BriefcaseBusiness
								className="cursor-pointer"
								onClick={() => handleAssignFunctionVolunteer(volunteer.id)}
								size={20}
							/>
						}
					>
						Atribuir função
					</Tooltip>
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={
							<TicketCheck className="cursor-pointer" onClick={() => handleCheckInVolunteer(volunteer.id)} size={20} />
						}
					>
						Check-In
					</Tooltip>
					<Tooltip
						{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
						trigger={
							<UserRoundX className="cursor-pointer" onClick={() => handleDeleteVolunteer(volunteer.id)} size={20} />
						}
					>
						Excluir
					</Tooltip>
				</div>
			),
			birthdate: formatBirthdate(volunteer.birthdate, volunteer.event.finalDate),
			called: volunteer.called,
			city: volunteer.address.city,
			createdAt: format(volunteer.createdAt, 'dd/MM/yyyy - HH:mm'),
			event: volunteer.event.name,
			id: volunteer.id,
			name: volunteer.name,
			phone: formatPhone(volunteer.phone),
			role: (
				<div className="flex gap-2">
					{!volunteer.eventRoles?.length ? (
						<FunctionTag />
					) : (
						volunteer.eventRoles.map((role) => (
							<FunctionTag
								isLeader={role.leaders.some(({ id }) => id === volunteer.id)}
								key={role.id}
								status={role.volunteerRole.role}
							/>
						))
					)}
				</div>
			),
			status: <StatusTag status={!volunteer.checkIn ? CHECK_IN_STATUS.NOT_ANSWERED : volunteer.checkIn} />,
		}
	})
}
