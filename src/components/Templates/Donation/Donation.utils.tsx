import { Trash2 } from 'lucide-react'

import { Tooltip } from '@/components/Atoms'
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
	{
		label: '',
		accessor: 'action',
	},
]

export const formatTableData = (
	data: Array<DonationAPI> | undefined,
	handleRemoveDonation: (id: DonationAPI['id']) => void,
) => {
	if (!data) return []

	return data.map((donation) => ({
		...donation,
		event: donation.event.name,
		value: currencyValue(Number(donation.value)),
		action: (
			<div className="hs-tooltip">
				<Trash2
					className="cursor-pointer"
					size={18}
					onClick={() => handleRemoveDonation(donation.id)}
				/>
				<Tooltip>Excluir</Tooltip>
			</div>
		),
	}))
}
