'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Step } from '@/components/Atoms'
import { AddressExternalForm, ParticipantExternalForm, PaymentExternalForm } from '@/components/Organisms'
import { MEMBERS, MODALS_IDS, overlayOpen, PAYMENT_METHOD_EXTERNAL_OPTIONS } from '@/constants'
import { formatDateToSendToApi } from '@/formatters'
import { useCreateParticipant } from '@/services/queries/participants'
import { generateToastError } from '@/utils/errors'

import { type FullSchemaType, fullSchema, stepsFields } from './ExternalParticipantForm.schema'

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
		defaultValues: {
			address: {
				city: '',
				neighborhood: '',
				number: '',
				state: '',
				street: '',
			},
			birthdate: '',
			called: '',
			email: '',
			hasHealth: '',
			hasReligion: '',
			health: '',
			host: '',
			hostPhone: '',
			name: '',
			paymentMethod: undefined,
			phone: '',
			religion: '',
			responsible: '',
			responsiblePhone: '',
			terms: undefined,
		},
		mode: 'onChange',
		resolver: zodResolver(fullSchema(minAge, maxAge, isInterestedList)),
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

		const { hasReligion, religion, hasHealth, health, paymentMethod, terms, ...data } = methods.getValues()

		const formattedData = {
			...data,
			...(hasReligion === 'Yes' && { religion }),
			...(hasHealth === 'Yes' && { health }),
			birthdate: formatDateToSendToApi(data.birthdate),
			eventId,
			hostPhone: data.hostPhone.replace(/\D/g, ''),
			phone: data.phone.replace(/\D/g, ''),
			responsiblePhone: data.responsiblePhone.replace(/\D/g, ''),
			...(isInterestedList && {
				inscriptionType: 'interested' as const,
				interested: true,
			}),
		}

		await create(
			{ ...formattedData },
			{
				onError: (error) => generateToastError(error, 'Erro ao realizar inscrição'),
				onSuccess: () => {
					if (paymentMethod === PAYMENT_METHOD_EXTERNAL_OPTIONS[1].value) {
						return overlayOpen(MODALS_IDS.PAYMENT_PIX_MODAL)
					}
					setCurrentStep(0)
					methods.reset()
					toast.success(
						isInterestedList
							? 'Inscrição de interesse realizada com sucesso, caso hajam desistências, entraremos em contato'
							: 'Inscrição realizada com sucesso!'
					)
				},
			}
		)
	}

	return (
		<div className="flex w-full grow flex-col" id="stepper">
			<FormProvider {...methods}>
				<Step
					currentStep={currentStep}
					handleFinish={methods.handleSubmit(onSubmit)}
					handleNext={handleNext}
					handlePrev={handlePrev}
					isPending={isPending}
					steps={[
						{
							content: <ParticipantExternalForm isNotHappening={isNotHappening} />,
							title: 'Participante',
						},
						{
							content: <AddressExternalForm type={MEMBERS.PARTICIPANT} />,
							title: 'Endereço',
						},
						...(!isInterestedList
							? [
									{
										content: (
											<PaymentExternalForm registrationValue={registrationValue} setCurrentStep={setCurrentStep} />
										),
										title: 'Pagamento',
									},
								]
							: []),
					]}
				/>
			</FormProvider>
		</div>
	)
}
