import { Trash2 } from 'lucide-react'

import { Tooltip } from '@/components/Atoms'
import { currencyValue } from '@/formatters'
import type { DonationAPI } from '@/services/queries/donations/donations.types'

export const HEADER_LABELS = [
	{
		accessor: 'name',
		label: 'Nome',
	},
	{
		accessor: 'event',
		label: 'Evento',
	},
	{
		accessor: 'value',
		label: 'Valor',
	},
	{
		accessor: 'action',
		label: '',
	},
]

export const formatTableData = (
	data: Array<DonationAPI> | undefined,
	handleRemoveDonation: (id: DonationAPI['id']) => void
) => {
	if (!data) return []

	return data.map((donation) => ({
		...donation,
		action: (
			<div className="hs-tooltip">
				<Trash2
					className="cursor-pointer"
					onClick={() => handleRemoveDonation(donation.id)}
					size={18}
				/>
				<Tooltip>Excluir</Tooltip>
			</div>
		),
		event: donation.event.name,
		value: currencyValue(Number(donation.value)),
	}))
}
