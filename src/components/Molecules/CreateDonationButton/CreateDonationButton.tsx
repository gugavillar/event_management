'use client'
import { HandHeart } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/components/Atoms'
import { DonationDrawer } from '@/components/Organisms'
import {
	DonationSchema,
	type DonationType,
} from '@/components/Organisms/DonationDrawer/DonationDrawer.schema'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

export const CreateDonationButton = memo(() => {
	const methods = useForm<DonationType>({
		defaultValues: {
			eventId: '',
			name: '',
			value: '',
		},
		resolver: zodResolver(DonationSchema),
	})

	const handleOpenDonationDrawer = () => {
		overlayOpen(MODALS_IDS.DONATION_CREATE_DRAWER)
	}

	return (
		<>
			<Button
				className="max-w-60 items-center justify-center self-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 md:self-end"
				leftIcon={<HandHeart />}
				onClick={handleOpenDonationDrawer}
				type="button"
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
