'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { HandHeart } from 'lucide-react'
import { memo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/Atoms'
import { DonationDrawer } from '@/components/Organisms'
import { DonationSchema, type DonationType } from '@/components/Organisms/DonationDrawer/DonationDrawer.schema'
import { DONATION_MODAL_TYPE } from '@/constants'

export const CreateDonationButton = memo(() => {
	const [isOpen, setIsOpen] = useState<DONATION_MODAL_TYPE | null>(null)
	const methods = useForm<DonationType>({
		defaultValues: {
			eventId: '',
			name: '',
			value: '',
		},
		resolver: zodResolver(DonationSchema),
	})

	const handleOpenDonationDrawer = () => {
		setIsOpen(DONATION_MODAL_TYPE.CREATE)
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
				<DonationDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
			</FormProvider>
		</>
	)
})

CreateDonationButton.displayName = 'CreateDonationButton'
