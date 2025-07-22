import { currencyValue } from '@/formatters'
import { DonationAPI } from '@/services/queries/donations/donations.types'

export const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Evento',
		accessor: 'event',
	},
	{
		label: 'Valor',
		accessor: 'value',
	},
]

export const formatTableData = (data: Array<DonationAPI> | undefined) => {
	if (!data) return []

	return data.map((donation) => ({
		...donation,
		event: donation.event.name,
		value: currencyValue(Number(donation.value)),
	}))
}
