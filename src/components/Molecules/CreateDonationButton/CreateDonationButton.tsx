'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { HandHeart } from 'lucide-react'
import { memo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/Atoms'
import { DonationDrawer } from '@/components/Organisms'
import {
	DonationSchema,
	DonationType,
} from '@/components/Organisms/DonationDrawer/DonationDrawer.schema'
import { MODALS_IDS } from '@/constants'

export const CreateDonationButton = memo(() => {
	const methods = useForm<DonationType>({
		defaultValues: {
			eventId: '',
			name: '',
			value: '',
		},
		resolver: zodResolver(DonationSchema),
	})
	return (
		<>
			<Button
				type="button"
				leftIcon={<HandHeart />}
				data-hs-overlay={`#${MODALS_IDS.DONATION_CREATE_DRAWER}`}
				className="max-w-60 items-center justify-center self-end border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			>
				Criar uma nova doação
			</Button>
			<FormProvider {...methods}>
				<DonationDrawer drawerId={MODALS_IDS.DONATION_CREATE_DRAWER} />
			</FormProvider>
		</>
	)
})

CreateDonationButton.displayName = 'CreateDonationButton'
