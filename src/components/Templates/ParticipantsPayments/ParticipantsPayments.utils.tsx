import { BanknoteArrowUp, HandCoins } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { PaymentTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS, LINE_COLOR, PaymentTypeAPI } from '@/constants'
import { currencyValue, formatPhone } from '@/formatters'
import { ParticipantsPaymentsAPI } from '@/services/queries/participants/participants.type'

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
	payments: Array<ParticipantsPaymentsAPI> | undefined,
	handlePaymentModal: (payment: ParticipantsPaymentsAPI) => void,
	handleReturnPaymentModal: (payment: ParticipantsPaymentsAPI) => void,
) => {
	if (!payments) return []

	return payments.map((payment) => {
		const isParticipantWithdraw =
			payment.participant.checkIn === CHECK_IN_STATUS.WITHDREW
		const isPaymentNotTotal =
			Number(payment.paymentValue) < Number(payment.event.participantPrice) &&
			payment.paymentType !== null
		const isParticipantPaidAndWithdraw =
			isParticipantWithdraw && Number(payment.paymentValue) > 0
		return {
			...((isPaymentNotTotal || isParticipantWithdraw) && {
				backgroundColor: isParticipantWithdraw
					? LINE_COLOR.withdrew
					: LINE_COLOR.payment,
			}),
			id: payment.id,
			name: payment.participant.name,
			phone: formatPhone(payment.participant.phone),
			valuePayed: currencyValue(Number(payment.paymentValue)),
			eventName: payment.event.name,
			eventValue: currencyValue(Number(payment.event.participantPrice)),
			payment: (
				<PaymentTag
					isNotTotal={isPaymentNotTotal}
					status={
						!payment.paymentType ? PaymentTypeAPI.OPEN : payment.paymentType
					}
				/>
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
