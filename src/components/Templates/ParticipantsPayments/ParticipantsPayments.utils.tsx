import { PaymentTag } from '@/components/Atoms'
import { PaymentTypeAPI } from '@/constants'
import { currencyValue, formatPhone } from '@/formatters'
import { ParticipantsPaymentsFromAPI } from '@/services/queries/participants/participants.type'

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
]

export const formatTableData = (payments?: ParticipantsPaymentsFromAPI[]) => {
	if (!payments) return []

	return payments.map((payment) => ({
		id: payment.id,
		name: payment.participant.name,
		phone: formatPhone(payment.participant.contact),
		valuePayed: currencyValue(Number(payment.paymentValue)),
		eventName: payment.event.name,
		eventValue: currencyValue(Number(payment.event.participantPrice)),
		payment: (
			<PaymentTag
				status={
					!payment.paymentType ? PaymentTypeAPI.OPEN : payment.paymentType
				}
			/>
		),
	}))
}
