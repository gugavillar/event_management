'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { APIErrorResponse } from '@/@types/error'
import { Step } from '@/components/Atoms'
import {
	AddressExternalForm,
	PaymentExternalForm,
} from '@/components/Organisms'
import { VolunteerExternalForm } from '@/components/Organisms/VolunteerExternalForm'
import { formatDateToSendToApi } from '@/formatters'
import { useCreateVolunteer } from '@/services/queries/volunteers'

import {
	ExternalVolunteerFormType,
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
	const methods = useForm<ExternalVolunteerFormType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			called: '',
			email: '',
			phone: '',
			birthdate: '',
			relative: '',
			relativePhone: '',
			hasCell: '',
			hasHealth: '',
			health: '',
			cell: '',
			community: '',
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

	const onSubmit: SubmitHandler<ExternalVolunteerFormType> = async () => {
		if (!eventId) return

		const { hasCell, cell, hasHealth, health, paymentMethod, ...data } =
			methods.getValues()

		const formattedData = {
			...data,
			...(hasCell === 'Yes' && { cell }),
			...(hasHealth === 'Yes' && { health }),
			birthdate: formatDateToSendToApi(data.birthdate),
			phone: data.phone.replace(/\D/g, ''),
			relativePhone: data.relativePhone.replace(/\D/g, ''),
			eventId,
		}

		await create(
			{ ...formattedData },
			{
				onSuccess: () => {
					setCurrentStep(0)
					methods.reset()
					toast.success('Inscrição realizada com sucesso!')
				},
				onError: (error: unknown) => {
					const err = error as APIErrorResponse
					if (err?.data?.error) {
						return toast.error(err.data.error)
					}

					toast.error('Erro ao realizar inscrição')
				},
			},
		)
	}

	return (
		<div className="flex w-full grow flex-col" id="stepper">
			<FormProvider {...methods}>
				<Step
					steps={[
						{ title: 'Voluntário', content: <VolunteerExternalForm /> },
						{ title: 'Endereço', content: <AddressExternalForm /> },
						{
							title: 'Pagamento',
							content: (
								<PaymentExternalForm registrationValue={registrationValue} />
							),
						},
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
