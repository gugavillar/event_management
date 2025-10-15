import { BanknoteArrowUp, FileUser, HandCoins } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { PaymentTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS, LINE_COLOR, PaymentTypeAPI } from '@/constants'
import { currencyValue, formatPhone } from '@/formatters'
import type { ParticipantsAPI } from '@/services/queries/participants/participants.type'

const generateTooltipText = (participantWithdraw: boolean, paymentTotal: boolean) => {
	if (participantWithdraw) {
		return 'Participante desistiu'
	}
	if (paymentTotal) {
		return 'Participante pagou o valor total'
	}
	return 'Informar pagamento'
}

export const HEADER_LABELS = [
	{
		accessor: 'name',
		label: 'Nome',
	},
	{
		accessor: 'called',
		label: 'Chamado',
	},
	{
		accessor: 'phone',
		label: 'Telefone',
	},
	{
		accessor: 'eventName',
		label: 'Evento',
	},
	{
		accessor: 'eventValue',
		label: 'Valor evento',
	},
	{
		accessor: 'valuePayed',
		label: 'Valor pago',
	},
	{
		accessor: 'payment',
		label: 'Status',
	},
	{
		accessor: 'actions',
		label: '',
	},
]

export const formatTableData = (
	payments: Array<ParticipantsAPI> | undefined,
	handlePaymentModal: (payment: ParticipantsAPI) => void,
	handleReturnPaymentModal: (payment: ParticipantsAPI) => void,
	handleShowParticipant: (id: ParticipantsAPI['id']) => void
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

		const isPaymentNotTotal = totalPayment > 0 && totalPayment < Number(payment.event.participantPrice)
		const isPaymentTotal = totalPayment >= Number(payment.event.participantPrice)
		const isParticipantPaidAndWithdraw = isParticipantWithdraw && totalPayment > 0
		const canInformPayment = !isPaymentTotal && !isParticipantWithdraw

		return {
			...((isPaymentNotTotal || isParticipantWithdraw) && {
				backgroundColor: isParticipantWithdraw ? LINE_COLOR.withdrew : LINE_COLOR.payment,
			}),
			actions: (
				<div className="flex space-x-4">
					<div className="hs-tooltip">
						<FileUser className="cursor-pointer" onClick={() => handleShowParticipant(payment.id)} size={20} />
						<Tooltip>Informações</Tooltip>
					</div>
					<div className="hs-tooltip">
						<HandCoins
							className={twMerge(
								isParticipantWithdraw || isPaymentTotal ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
							)}
							size={20}
							{...(canInformPayment && {
								onClick: () => handlePaymentModal(payment),
							})}
						/>
						<Tooltip>{generateTooltipText(isParticipantWithdraw, isPaymentTotal)}</Tooltip>
					</div>
					{isParticipantPaidAndWithdraw && (
						<div className="hs-tooltip">
							<BanknoteArrowUp className="cursor-pointer" onClick={() => handleReturnPaymentModal(payment)} size={20} />
							<Tooltip>Devolver pagamento</Tooltip>
						</div>
					)}
				</div>
			),
			called: payment.called,
			eventName: payment.event.name,
			eventValue: currencyValue(Number(payment.event.participantPrice)),
			id: payment.id,
			name: payment.name,
			payment: (
				<div className="flex gap-2">
					{!payment.payments.length ? (
						<PaymentTag status={PaymentTypeAPI.OPEN} />
					) : (
						payment.payments.map((p) => (
							<PaymentTag key={p.id} status={!p.paymentType ? PaymentTypeAPI.OPEN : p.paymentType} />
						))
					)}
				</div>
			),
			phone: formatPhone(payment.phone),
			valuePayed: currencyValue(totalPayment),
		}
	})
}
