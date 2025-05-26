'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Step } from '@/components/Atoms'
import {
	AddressExternalForm,
	PaymentExternalForm,
	ParticipantExternalForm,
} from '@/components/Organisms'

import {
	ExternalParticipantFormType,
	stepsFields,
} from './ExternalParticipantForm.schema'

export type ExternalParticipantFormProps = {
	registrationValue?: number
}

export const ExternalParticipantForm = ({
	registrationValue,
}: ExternalParticipantFormProps) => {
	const [currentStep, setCurrentStep] = useState(0)
	const methods = useForm<ExternalParticipantFormType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			called: '',
			birthdate: '',
			phone: '',
			responsible: '',
			responsiblePhone: '',
			hasReligion: undefined,
			religion: '',
			host: '',
			hostPhone: '',
			address: {
				street: '',
				number: '',
				neighborhood: '',
				city: '',
				state: '',
			},
			paymentMethod: undefined,
		},
		resolver: zodResolver(stepsFields[currentStep].schema),
	})

	const handleNext = async () => {
		if (currentStep === stepsFields.length - 1) return

		const fields = stepsFields[currentStep].fields
		const output = await methods.trigger(fields, {
			shouldFocus: true,
		})

		if (!output) return

		setCurrentStep((step) => step + 1)
	}

	const handlePrev = () => {
		if (currentStep === 0) return

		setCurrentStep((step) => step - 1)
	}

	return (
		<div className="flex w-full grow flex-col" id="stepper">
			<FormProvider {...methods}>
				<Step
					steps={[
						{ title: 'Participante', content: <ParticipantExternalForm /> },
						{ title: 'Endereço', content: <AddressExternalForm /> },
						{
							title: 'Pagamento',
							content: (
								<PaymentExternalForm registrationValue={registrationValue} />
							),
						},
					]}
					currentStep={currentStep}
					handlePrev={handlePrev}
					handleNext={handleNext}
					handleFinish={() => console.log('finish')}
				/>
			</FormProvider>
		</div>
	)
}
