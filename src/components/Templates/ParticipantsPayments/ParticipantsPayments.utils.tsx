import { BanknoteArrowUp, HandCoins } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { PaymentTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS, LINE_COLOR, PaymentTypeAPI } from '@/constants'
import { currencyValue, formatPhone } from '@/formatters'
import { ParticipantsAPI } from '@/services/queries/participants/participants.type'

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
	payments: Array<ParticipantsAPI> | undefined,
	handlePaymentModal: (payment: ParticipantsAPI) => void,
	handleReturnPaymentModal: (payment: ParticipantsAPI) => void,
) => {
	if (!payments) return []

	return payments.map((payment) => {
		const isParticipantWithdraw = payment.checkIn === CHECK_IN_STATUS.WITHDREW
		const totalPayment = payment.payments.reduce((total, p) => {
			if (payment.id === p.participantId) {
				return total + Number(p.paymentValue)
			}
			return total
		}, 0)

		const isPaymentNotTotal =
			totalPayment > 0 && totalPayment < Number(payment.event.participantPrice)
		const isParticipantPaidAndWithdraw =
			isParticipantWithdraw && totalPayment > 0

		return {
			...((isPaymentNotTotal || isParticipantWithdraw) && {
				backgroundColor: isParticipantWithdraw
					? LINE_COLOR.withdrew
					: LINE_COLOR.payment,
			}),
			id: payment.id,
			name: payment.name,
			phone: formatPhone(payment.phone),
			valuePayed: currencyValue(totalPayment),
			eventName: payment.event.name,
			eventValue: currencyValue(Number(payment.event.participantPrice)),
			payment: (
				<div className="flex gap-2">
					{!payment.payments.length ? (
						<PaymentTag status={PaymentTypeAPI.OPEN} />
					) : (
						payment.payments.map((p) => (
							<PaymentTag
								key={p.id}
								status={!p.paymentType ? PaymentTypeAPI.OPEN : p.paymentType}
							/>
						))
					)}
				</div>
			),
			actions: (
				<div className="flex space-x-4">
					<div className="hs-tooltip">
						<HandCoins
							className={twMerge(
								isParticipantWithdraw
									? 'cursor-not-allowed opacity-50'
									: 'cursor-pointer',
							)}
							size={20}
							{...(!isParticipantWithdraw && {
								onClick: () => handlePaymentModal(payment),
							})}
						/>
						<Tooltip>
							{isParticipantWithdraw
								? 'Participante desistiu'
								: 'Informar pagamento'}
						</Tooltip>
					</div>
					{isParticipantPaidAndWithdraw && (
						<div className="hs-tooltip">
							<BanknoteArrowUp
								className="cursor-pointer"
								size={20}
								onClick={() => handleReturnPaymentModal(payment)}
							/>
							<Tooltip>Devolver pagamento</Tooltip>
						</div>
					)}
				</div>
			),
		}
	})
}
