'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleDollarSign } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/Atoms'
import { MODALS_IDS, overlayOpen } from '@/constants'

import { TransactionDrawer } from '../TransactionDrawer'
import {
	TransactionSchema,
	TransactionType,
} from '../TransactionDrawer/TransactionDrawer.schema'

export const CreateTransaction = ({ eventId }: { eventId: string }) => {
	const methods = useForm<TransactionType>({
		mode: 'onChange',
		resolver: zodResolver(TransactionSchema),
		defaultValues: {
			amount: '',
			date: '',
			description: '',
			type: '',
			amountType: '',
		},
	})
	const handleCreateTransaction = () => {
		overlayOpen(MODALS_IDS.TRANSACTION_CREATE_DRAWER)
	}
	return (
		<>
			<Button
				type="button"
				onClick={handleCreateTransaction}
				leftIcon={<CircleDollarSign />}
				className="max-w-sm min-w-60 items-center justify-center self-end border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			>
				Criar transação
			</Button>
			<FormProvider {...methods}>
				<TransactionDrawer
					drawerId={MODALS_IDS.TRANSACTION_CREATE_DRAWER}
					eventId={eventId}
				/>
			</FormProvider>
		</>
	)
}
