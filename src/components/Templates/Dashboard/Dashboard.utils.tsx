import { formatBirthdate } from '@/formatters'
import type { DashboardFromAPI } from '@/services/queries/dashboard/dashboard.types'

export const HEADERS_LABELS = [
	{
		accessor: 'name',
		label: 'Nome',
	},
	{
		accessor: 'birthdate',
		label: 'Data de nascimento',
	},
]

export const formatTableData = (data: DashboardFromAPI['birthdayPeople']) => {
	if (!data) return []

	return data.map((person) => ({
		birthdate: formatBirthdate(person.birthdate, person.event.finalDate, false),
		id: person.id,
		name: person.name,
	}))
}
