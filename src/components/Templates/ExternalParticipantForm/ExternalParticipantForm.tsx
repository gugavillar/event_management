'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { Step } from '@/components/Atoms'
import {
	AddressExternalForm,
	PaymentExternalForm,
	ParticipantExternalForm,
} from '@/components/Organisms'

export type ExternalParticipantFormProps = {
	registrationValue?: number
}

export const ExternalParticipantForm = ({
	registrationValue,
}: ExternalParticipantFormProps) => {
	const methods = useForm()
	return (
		<div data-hs-stepper className="flex w-full grow flex-col">
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
					finalContent={<></>}
					handleFinish={() => console.log('finish')}
				/>
			</FormProvider>
		</div>
	)
}
