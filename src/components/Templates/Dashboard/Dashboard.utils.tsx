import { formatBirthdate } from '@/formatters'
import { DashboardFromAPI } from '@/services/queries/dashboard/dashboard.types'

export const HEADERS_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Data de nascimento',
		accessor: 'birthdate',
	},
]

export const formatTableData = (data: DashboardFromAPI['birthdayPeople']) => {
	if (!data) return []

	return data.map((person) => ({
		id: person.id,
		name: person.name,
		birthdate: formatBirthdate(person.birthdate, person.event.finalDate, false),
	}))
}
