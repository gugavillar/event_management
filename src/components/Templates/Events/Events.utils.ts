import { format } from 'date-fns'

import { GenderType } from '@/constants'
import { currencyValue } from '@/formatters'
import { EventsFromAPI } from '@/services/queries/events/event.type'

export const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Gênero permitido',
		accessor: 'gender',
	},
	{
		label: 'Data inicial',
		accessor: 'initialDate',
	},
	{
		label: 'Data final',
		accessor: 'finalDate',
	},
	{
		label: 'Valor do participante',
		accessor: 'participantPrice',
	},
	{
		label: 'Valor do voluntário',
		accessor: 'volunteerPrice',
	},
]

export const formatTableData = (data: Array<EventsFromAPI>) => {
	return data?.map((event) => ({
		...event,
		gender: GenderType[event.gender].label,
		initialDate: format(event.initialDate, 'dd/MM/yyyy'),
		finalDate: format(event.finalDate, 'dd/MM/yyyy'),
		participantPrice: currencyValue(Number(event.participantPrice)),
		volunteerPrice: currencyValue(Number(event.volunteerPrice)),
	}))
}
