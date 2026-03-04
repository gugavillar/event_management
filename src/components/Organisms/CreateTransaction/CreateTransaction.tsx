'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleDollarSign } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/Atoms'
import { TRANSACTION_MODAL_TYPE } from '@/constants'

import { TransactionDrawer } from '../TransactionDrawer'
import { TransactionSchema, type TransactionType } from '../TransactionDrawer/TransactionDrawer.schema'

export const CreateTransaction = ({ eventId }: { eventId: string }) => {
	const [isOpen, setIsOpen] = useState<TRANSACTION_MODAL_TYPE | null>(null)
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
		setIsOpen(TRANSACTION_MODAL_TYPE.CREATE)
	}
	return (
		<>
			<Button
				className="min-w-60 max-w-sm items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				leftIcon={<CircleDollarSign />}
				onClick={handleCreateTransaction}
				type="button"
			>
				Criar transação
			</Button>
			<FormProvider {...methods}>
				<TransactionDrawer eventId={eventId} isOpen={isOpen} setIsOpen={setIsOpen} />
			</FormProvider>
		</>
	)
}
