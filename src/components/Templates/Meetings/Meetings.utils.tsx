import { CheckboxField } from '@/components/Molecules'
import type { MeetingAPI } from '@/services/queries/meetings/meetings.types'
import { format } from 'date-fns'
import type { UseFormWatch } from 'react-hook-form'
import type { MeetingSchemaType } from './Meetings.schema'

export const HEADER_LABELS = [
	{
		accessor: 'name',
		label: 'Voluntário',
	},
	{
		accessor: 'meetingDate',
		label: 'Data da reunião',
	},
	{
		accessor: 'presence',
		className: 'text-center',
		label: 'Presença',
	},
	{
		accessor: 'justification',
		className: 'text-center',
		label: 'Falta justificada',
	},
]

export const formatTableData = (
	data: MeetingAPI | undefined,
	watch: UseFormWatch<MeetingSchemaType>
) => {
	if (!data) return []

	return data?.volunteers?.map((volunteer, index) => ({
		id: volunteer.id,
		justification: (
			<CheckboxField
				className="size-5"
				disabled={watch(`presence.${index}.${volunteer.id}`)}
				fieldClassName="justify-items-center"
				fieldName={`justification.${index}.${volunteer.id}`}
				label=""
			/>
		),
		meetingDate: format(data.meeting.date, 'dd/MM/yyyy'),
		name: volunteer.name,
		presence: (
			<CheckboxField
				className="size-5"
				disabled={watch(`justification.${index}.${volunteer.id}`)}
				fieldClassName="justify-items-center"
				fieldName={`presence.${index}.${volunteer.id}`}
				label=""
			/>
		),
	}))
}
