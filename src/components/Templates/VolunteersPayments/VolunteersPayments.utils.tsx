import { HandCoins } from 'lucide-react'

import { PaymentTag, Tooltip } from '@/components/Atoms'
import { PaymentTypeAPI } from '@/constants'
import { currencyValue, formatPhone } from '@/formatters'
import { VolunteersPaymentsAPI } from '@/services/queries/volunteers/volunteers.type'

export const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Telefone',
		accessor: 'phone',
	},
	{
		label: 'Evento',
		accessor: 'eventName',
	},
	{
		label: 'Valor evento',
		accessor: 'eventValue',
	},
	{
		label: 'Valor pago',
		accessor: 'valuePayed',
	},
	{
		label: 'Status',
		accessor: 'payment',
	},
	{
		label: '',
		accessor: 'actions',
	},
]

export const formatTableData = (
	payments: Array<VolunteersPaymentsAPI> | undefined,
	handlePaymentModal: (payment: VolunteersPaymentsAPI) => void,
) => {
	if (!payments) return []

	return payments.map((payment) => ({
		id: payment.id,
		name: payment.volunteer.name,
		phone: formatPhone(payment.volunteer.phone),
		valuePayed: currencyValue(Number(payment.paymentValue)),
		eventName: payment.event.name,
		eventValue: currencyValue(Number(payment.event.volunteerPrice)),
		payment: (
			<PaymentTag
				status={
					!payment.paymentType ? PaymentTypeAPI.OPEN : payment.paymentType
				}
			/>
		),
		actions: (
			<div className="flex space-x-4">
				<div className="hs-tooltip">
					<HandCoins
						className="cursor-pointer"
						size={20}
						onClick={() => handlePaymentModal(payment)}
					/>
					<Tooltip>Informar pagamento</Tooltip>
				</div>
			</div>
		),
	}))
}
