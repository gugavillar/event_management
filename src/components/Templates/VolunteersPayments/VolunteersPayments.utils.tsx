import { BanknoteArrowUp, FileUser, HandCoins } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { PaymentTag, Tooltip } from '@/components/Atoms'
import { CHECK_IN_STATUS, LINE_COLOR, PaymentTypeAPI } from '@/constants'
import { currencyValue, formatPhone } from '@/formatters'
import type { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'

const generateTooltipText = (
	volunteerWithdraw: boolean,
	paymentTotal: boolean
) => {
	if (volunteerWithdraw) {
		return 'Voluntário desistiu'
	}
	if (paymentTotal) {
		return 'Voluntário pagou o valor total'
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
	payments: Array<VolunteersAPI> | undefined,
	handlePaymentModal: (payment: VolunteersAPI) => void,
	handleReturnPaymentModal: (payment: VolunteersAPI) => void,
	handleShowVolunteer: (id: VolunteersAPI['id']) => void
) => {
	if (!payments) return []

	return payments.map((payment) => {
		const isVolunteerWithdraw = payment.checkIn === CHECK_IN_STATUS.WITHDREW
		const totalPayment = payment.payments.reduce((total, p) => {
			if (payment.id === p.volunteerId) {
				return total + Number(p.paymentValue)
			}
			return total
		}, 0)

		const isPaymentNotTotal =
			totalPayment > 0 && totalPayment < Number(payment.event.volunteerPrice)
		const isPaymentTotal = totalPayment >= Number(payment.event.volunteerPrice)
		const isVolunteerPaidAndWithdraw = isVolunteerWithdraw && totalPayment > 0
		const canInformPayment = !isPaymentTotal && !isVolunteerWithdraw

		return {
			...((isPaymentNotTotal || isVolunteerWithdraw) && {
				backgroundColor: isVolunteerWithdraw
					? LINE_COLOR.withdrew
					: LINE_COLOR.payment,
			}),
			actions: (
				<div className="flex space-x-4">
					<div className="hs-tooltip">
						<FileUser
							className="cursor-pointer"
							onClick={() => handleShowVolunteer(payment.id)}
							size={20}
						/>
						<Tooltip>Informações</Tooltip>
					</div>
					<div className="hs-tooltip">
						<HandCoins
							className={twMerge(
								isVolunteerWithdraw || isPaymentTotal
									? 'cursor-not-allowed opacity-50'
									: 'cursor-pointer'
							)}
							size={20}
							{...(canInformPayment && {
								onClick: () => handlePaymentModal(payment),
							})}
						/>
						<Tooltip>
							{generateTooltipText(isVolunteerWithdraw, isPaymentTotal)}
						</Tooltip>
					</div>
					{isVolunteerPaidAndWithdraw && (
						<div className="hs-tooltip">
							<BanknoteArrowUp
								className="cursor-pointer"
								onClick={() => handleReturnPaymentModal(payment)}
								size={20}
							/>
							<Tooltip>Devolver pagamento</Tooltip>
						</div>
					)}
				</div>
			),
			called: payment.called,
			eventName: payment.event.name,
			eventValue: currencyValue(Number(payment.event.volunteerPrice)),
			id: payment.id,
			name: payment.name,
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
			phone: formatPhone(payment.phone),
			valuePayed: currencyValue(totalPayment),
		}
	})
}
