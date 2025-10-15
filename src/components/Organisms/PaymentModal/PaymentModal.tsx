'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { OctagonAlert } from 'lucide-react'
import { memo } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { CurrencyInputField, RadioField, SelectField } from '@/components/Molecules'
import { overlayClose, PaymentSelectOptions, PaymentTypeAPI } from '@/constants'
import { currencyValue } from '@/formatters'

import { PaymentModalSchema, type PaymentModalType } from './PaymentModal.schema'
import { paymentOptionsRadio } from './PaymentModal.utils'

type PaymentModalProps = {
	modalId: string
	modalType: 'participante' | 'voluntário'
	handleSubmit: (values: PaymentModalType) => Promise<void>
	isPending: boolean
	isExistPayment: boolean
	paidValue: number
	eventValue: number
}

export const PaymentModal = memo(
	({ modalId, modalType, handleSubmit, isPending, isExistPayment, paidValue, eventValue }: PaymentModalProps) => {
		const methods = useForm<PaymentModalType>({
			defaultValues: {
				paid: undefined,
				paymentReceived: '',
				paymentType: '',
				paymentValue: '',
			},
			mode: 'onChange',
			resolver: zodResolver(PaymentModalSchema(eventValue, paidValue)),
		})

		const handleClose = () => {
			methods.reset()
			overlayClose(modalId)
		}

		const onSubmit: SubmitHandler<PaymentModalType> = async (values) => {
			await handleSubmit(values)
			handleClose()
		}

		const paymentOptions = PaymentSelectOptions.filter((item) => item.value !== PaymentTypeAPI.OPEN)

		const isPartialPayment = methods.watch('paid') === 'partial'
		const isCardPaymentType = methods.watch('paymentType') === PaymentTypeAPI.CARD

		return (
			<Modal handleClose={handleClose} modalId={modalId}>
				<FormProvider {...methods}>
					<form className="flex flex-col items-center justify-center gap-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
						<div className="flex flex-col items-center justify-between gap-2">
							<OctagonAlert className="text-amber-300" size={64} />
							<Header as="h3" className="text-center text-lg">
								Você deseja confirmar o pagamento do {modalType}?
							</Header>
						</div>
						<div className="flex w-full items-center justify-between">
							<Text>
								<span className="font-semibold">Valor da inscrição: </span>
								{currencyValue(eventValue)}
							</Text>
							<Text>
								<span className="font-semibold">Valor já pago:</span> {currencyValue(paidValue)}
							</Text>
						</div>
						<RadioField fieldName="paid" options={paymentOptionsRadio(isExistPayment)} position="row">
							O pagamento é total ou parcial?
						</RadioField>
						<SelectField fieldName="paymentType" options={paymentOptions} placeholder="Selecione o tipo do pagamento">
							Tipo de pagamento
						</SelectField>
						{isPartialPayment && (
							<CurrencyInputField fieldName="paymentValue" type="tel">
								Informe o valor pago
							</CurrencyInputField>
						)}
						{isCardPaymentType && (
							<CurrencyInputField fieldName="paymentReceived" type="tel">
								Informe o valor recebido
							</CurrencyInputField>
						)}
						<div className="flex w-full flex-col justify-end gap-y-4 md:flex-row md:gap-x-5">
							<Button
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200 md:w-32"
								disabled={isPending}
								onClick={handleClose}
								type="button"
							>
								Cancelar
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 md:w-32"
								disabled={!methods.formState.isValid || isPending}
								isLoading={isPending}
								type="submit"
							>
								Confirmar
							</Button>
						</div>
					</form>
				</FormProvider>
			</Modal>
		)
	}
)

PaymentModal.displayName = 'PaymentModal'
