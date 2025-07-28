'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Step } from '@/components/Atoms'
import {
	AddressExternalForm,
	PaymentExternalForm,
	ParticipantExternalForm,
} from '@/components/Organisms'
import {
	MODALS_IDS,
	overlayOpen,
	PAYMENT_METHOD_EXTERNAL_OPTIONS,
} from '@/constants'
import { formatDateToSendToApi } from '@/formatters'
import { useCreateParticipant } from '@/services/queries/participants'
import { generateToastError } from '@/utils/errors'

import {
	fullSchema,
	FullSchemaType,
	stepsFields,
} from './ExternalParticipantForm.schema'

export type ExternalParticipantFormProps = {
	registrationValue?: number
	minAge?: number | null
	maxAge?: number | null
	eventId?: string
	isInterestedList?: boolean
	isNotHappening?: boolean
}

export const ExternalParticipantForm = ({
	registrationValue,
	minAge,
	maxAge,
	eventId,
	isInterestedList,
	isNotHappening,
}: ExternalParticipantFormProps) => {
	const [currentStep, setCurrentStep] = useState(0)

	const { create, isPending } = useCreateParticipant()
	const methods = useForm<FullSchemaType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			called: '',
			email: '',
			phone: '',
			birthdate: '',
			responsible: '',
			responsiblePhone: '',
			hasReligion: '',
			hasHealth: '',
			health: '',
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
		resolver: zodResolver(fullSchema(minAge, maxAge)),
	})

	const handleNext = async () => {
		if (currentStep === stepsFields(minAge, maxAge).length - 1) return

		const fields = stepsFields(minAge, maxAge)[currentStep].fields
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

	const onSubmit: SubmitHandler<FullSchemaType> = async () => {
		if (!eventId) return

		const { hasReligion, religion, hasHealth, health, paymentMethod, ...data } =
			methods.getValues()

		const formattedData = {
			...data,
			...(hasReligion === 'Yes' && { religion }),
			...(hasHealth === 'Yes' && { health }),
			birthdate: formatDateToSendToApi(data.birthdate),
			phone: data.phone.replace(/\D/g, ''),
			hostPhone: data.hostPhone.replace(/\D/g, ''),
			responsiblePhone: data.responsiblePhone.replace(/\D/g, ''),
			eventId,
			...(isInterestedList && {
				interested: true,
				inscriptionType: 'interested' as const,
			}),
		}

		await create(
			{ ...formattedData },
			{
				onSuccess: () => {
					if (paymentMethod === PAYMENT_METHOD_EXTERNAL_OPTIONS[1].value) {
						return overlayOpen(MODALS_IDS.PAYMENT_PIX_MODAL)
					}
					setCurrentStep(0)
					methods.reset()
					toast.success(
						isInterestedList
							? 'Inscrição de interesse realizada com sucesso, caso hajam desistências, entraremos em contato'
							: 'Inscrição realizada com sucesso!',
					)
				},
				onError: (error) =>
					generateToastError(error, 'Erro ao realizar inscrição'),
			},
		)
	}

	return (
		<div className="flex w-full grow flex-col" id="stepper">
			<FormProvider {...methods}>
				<Step
					steps={[
						{
							title: 'Participante',
							content: (
								<ParticipantExternalForm isNotHappening={isNotHappening} />
							),
						},
						{ title: 'Endereço', content: <AddressExternalForm /> },
						...(!isInterestedList
							? [
									{
										title: 'Pagamento',
										content: (
											<PaymentExternalForm
												registrationValue={registrationValue}
												setCurrentStep={setCurrentStep}
											/>
										),
									},
								]
							: []),
					]}
					isPending={isPending}
					currentStep={currentStep}
					handlePrev={handlePrev}
					handleNext={handleNext}
					handleFinish={methods.handleSubmit(onSubmit)}
				/>
			</FormProvider>
		</div>
	)
}
