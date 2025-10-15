'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

import { Step } from '@/components/Atoms'
import {
	AddressExternalForm,
	PaymentExternalForm,
} from '@/components/Organisms'
import { VolunteerExternalForm } from '@/components/Organisms/VolunteerExternalForm'
import {
	MEMBERS,
	MODALS_IDS,
	overlayOpen,
	PAYMENT_METHOD_EXTERNAL_OPTIONS,
} from '@/constants'
import { formatDateToSendToApi } from '@/formatters'
import { useCreateVolunteer } from '@/services/queries/volunteers'
import { generateToastError } from '@/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import {
	type FullSchemaType,
	fullSchema,
	stepsFields,
} from './ExternalVolunteerForm.schema'

export type ExternalVolunteerFormProps = {
	registrationValue?: number
	eventId?: string
}

export const ExternalVolunteerForm = ({
	registrationValue,
	eventId,
}: ExternalVolunteerFormProps) => {
	const [currentStep, setCurrentStep] = useState(0)

	const { create, isPending } = useCreateVolunteer()
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
			cell: '',
			community: '',
			email: '',
			hasCell: '',
			hasHealth: '',
			health: '',
			name: '',
			paymentMethod: undefined,
			phone: '',
			relative: '',
			relativePhone: '',
			terms: undefined,
		},
		mode: 'onChange',
		resolver: zodResolver(fullSchema),
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

	const onSubmit: SubmitHandler<FullSchemaType> = async () => {
		if (!eventId) return

		const { hasCell, cell, hasHealth, health, paymentMethod, terms, ...data } =
			methods.getValues()

		const formattedData = {
			...data,
			...(hasCell === 'Yes' && { cell }),
			...(hasHealth === 'Yes' && { health }),
			birthdate: formatDateToSendToApi(data.birthdate),
			eventId,
			phone: data.phone.replace(/\D/g, ''),
			relativePhone: data.relativePhone.replace(/\D/g, ''),
		}

		await create(
			{ ...formattedData },
			{
				onError: (error) =>
					generateToastError(error, 'Erro ao realizar inscrição'),
				onSuccess: () => {
					if (paymentMethod === PAYMENT_METHOD_EXTERNAL_OPTIONS[1].value) {
						return overlayOpen(MODALS_IDS.PAYMENT_PIX_MODAL)
					}
					setCurrentStep(0)
					methods.reset()
					toast.success('Inscrição realizada com sucesso!')
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
						{ content: <VolunteerExternalForm />, title: 'Voluntário' },
						{
							content: <AddressExternalForm type={MEMBERS.VOLUNTEER} />,
							title: 'Endereço',
						},
						{
							content: (
								<PaymentExternalForm
									registrationValue={registrationValue}
									setCurrentStep={setCurrentStep}
								/>
							),
							title: 'Pagamento',
						},
					]}
				/>
			</FormProvider>
		</div>
	)
}
