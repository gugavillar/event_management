'use client'
import { CircleDollarSign } from 'lucide-react'

import { Button } from '@/components/Atoms'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { TransactionDrawer } from '../TransactionDrawer'
import {
	TransactionSchema,
	type TransactionType,
} from '../TransactionDrawer/TransactionDrawer.schema'

export const CreateTransaction = ({ eventId }: { eventId: string }) => {
	const methods = useForm<TransactionType>({
		defaultValues: {
			amount: '',
			amountType: '',
			date: '',
			description: '',
			type: '',
		},
		mode: 'onChange',
		resolver: zodResolver(TransactionSchema),
	})
	const handleCreateTransaction = () => {
		overlayOpen(MODALS_IDS.TRANSACTION_CREATE_DRAWER)
	}
	return (
		<>
			<Button
				className="max-w-sm min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				leftIcon={<CircleDollarSign />}
				onClick={handleCreateTransaction}
				type="button"
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
