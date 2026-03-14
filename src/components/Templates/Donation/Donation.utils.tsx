import { Trash2 } from 'lucide-react'

import { Tooltip } from '@/components/Atoms'
import { COMMON_PROPS_TOOLTIPS_BUTTON_TABLE, PaymentType } from '@/constants'
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
		accessor: 'donationType',
		label: 'Tipo',
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
			<Tooltip
				{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
				trigger={<Trash2 className="cursor-pointer" onClick={() => handleRemoveDonation(donation.id)} size={18} />}
			>
				Excluir
			</Tooltip>
		),
		donationType: PaymentType[donation.type as keyof typeof PaymentType].label,
		event: donation.event.name,
		value: currencyValue(Number(donation.value)),
	}))
}
