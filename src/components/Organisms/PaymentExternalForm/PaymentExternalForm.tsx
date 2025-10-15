'use client'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { SelectField } from '@/components/Molecules'
import type { ExternalParticipantFormProps } from '@/components/Templates'
import type { FullSchemaType } from '@/components/Templates/ExternalParticipantForm/ExternalParticipantForm.schema'
import { PAYMENT_METHOD_EXTERNAL_OPTIONS } from '@/constants'

import { PaymentChoice } from './PaymentChoice'

type PaymentExternalFormProps = ExternalParticipantFormProps & {
	setCurrentStep: Dispatch<SetStateAction<number>>
}

export const PaymentExternalForm = ({ registrationValue, setCurrentStep }: PaymentExternalFormProps) => {
	const [pixValue, setPixValue] = useState<string | null>(null)
	const { watch } = useFormContext<FullSchemaType>()

	const paymentMethod = watch('paymentMethod') ?? ''

	return (
		<div className="flex flex-col space-y-8">
			<SelectField
				fieldName="paymentMethod"
				options={PAYMENT_METHOD_EXTERNAL_OPTIONS}
				placeholder="Selecione o tipo de pagamento"
			>
				Selecione uma das opções abaixo e siga as instruções para concluir o pagamento da sua inscrição
			</SelectField>
			<PaymentChoice
				paymentMethod={paymentMethod}
				pixValue={pixValue}
				registrationValue={registrationValue}
				setCurrentStep={setCurrentStep}
				setPixValue={setPixValue}
			/>
		</div>
	)
}
