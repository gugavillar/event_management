'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { OctagonAlert } from 'lucide-react'
import { memo } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import { Button, Header, Modal } from '@/components/Atoms'
import { CurrencyInputField, RadioField } from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { VolunteersPaymentsAPI } from '@/services/queries/volunteers/volunteers.type'

import {
	ModalReturnPaymentSchema,
	ModalReturnPaymentType,
} from './ModalReturnPayment.schema'
import { paymentOptionsRadio } from './ModalReturnPayment.utils'

type ModalReturnPaymentProps = {
	modalId: string
	modalType: 'participante' | 'voluntário'
	handleSubmit: (values: ModalReturnPaymentType) => Promise<void>
	isPending: boolean
	payment: VolunteersPaymentsAPI | null
}

export const ModalReturnPayment = memo(
	({
		modalId,
		modalType,
		handleSubmit,
		isPending,
		payment,
	}: ModalReturnPaymentProps) => {
		const methods = useForm<ModalReturnPaymentType>({
			mode: 'onChange',
			defaultValues: {
				returnPaid: undefined,
				returnValue: '',
			},
			resolver: zodResolver(ModalReturnPaymentSchema),
		})

		const handleClose = () => {
			methods.reset()
			overlayClose(modalId)
		}

		const onSubmit: SubmitHandler<ModalReturnPaymentType> = async (values) => {
			await handleSubmit(values)
			handleClose()
		}

		const isPartialPayment = methods.watch('returnPaid') === 'partial'
		const isTotalDisabled =
			Number(payment?.paymentValue) < Number(payment?.event.volunteerPrice)

		return (
			<Modal modalId={modalId} handleClose={handleClose}>
				<FormProvider {...methods}>
					<form
						className="flex flex-col items-center justify-center gap-y-6"
						onSubmit={methods.handleSubmit(onSubmit)}
					>
						<div className="flex flex-col items-center justify-between gap-2">
							<OctagonAlert size={32} className="text-amber-300" />
							<Header as="h3" className="text-center text-lg">
								Você deseja confirmar a devolução do pagamento do {modalType}?
							</Header>
						</div>
						<RadioField
							fieldName="returnPaid"
							options={paymentOptionsRadio(isTotalDisabled)}
							position="row"
						>
							A devolução é total ou parcial?
						</RadioField>
						{isPartialPayment && (
							<CurrencyInputField type="tel" fieldName="returnValue">
								Informe o valor devolvido
							</CurrencyInputField>
						)}
						<div className="flex w-full flex-col justify-end gap-y-4 md:flex-row md:gap-x-5">
							<Button
								type="button"
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200 md:w-32"
								onClick={handleClose}
								disabled={isPending}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								disabled={!methods.formState.isValid || isPending}
								isLoading={isPending}
								className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 md:w-32"
							>
								Confirmar
							</Button>
						</div>
					</form>
				</FormProvider>
			</Modal>
		)
	},
)

ModalReturnPayment.displayName = 'ModalReturnPayment'
