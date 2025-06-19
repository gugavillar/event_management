import { format } from 'date-fns'

import { CheckboxField } from '@/components/Molecules'
import { MeetingAPI } from '@/services/queries/meetings/meetings.types'

export const HEADER_LABELS = [
	{
		label: 'Voluntário',
		accessor: 'name',
	},
	{
		label: 'Data da reunião',
		accessor: 'meetingDate',
	},
	{
		label: 'Presença',
		accessor: 'presence',
		className: 'text-center',
	},
	{
		label: 'Falta justificada',
		accessor: 'justification',
		className: 'text-center',
	},
]

export const formatTableData = (data: MeetingAPI | undefined) => {
	if (!data) return []

	return data?.volunteers.map((volunteer, index) => ({
		id: volunteer.id,
		name: volunteer.name,
		meetingDate: format(data.meeting.date, 'dd/MM/yyyy'),
		presence: (
			<CheckboxField
				fieldClassName="justify-items-center"
				fieldName={`presence.${index}.${volunteer.id}`}
				label=""
			/>
		),
		justification: (
			<CheckboxField
				fieldClassName="justify-items-center"
				fieldName={`justification.${index}.${volunteer.id}`}
				label=""
			/>
		),
	}))
}
