'use client'
import { OctagonAlert } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useDeleteTransaction } from '@/services/queries/transactions/hooks'
import { TransactionsAPI } from '@/services/queries/transactions/transactions.types'
import { generateToastError } from '@/utils/errors'

type TransactionDeleteModalProps = {
	modalId: string
	selectedTransaction: TransactionsAPI['id'] | null
	setSelectedTransaction: Dispatch<SetStateAction<TransactionsAPI['id'] | null>>
}

export const TransactionDeleteModal = ({
	modalId,
	selectedTransaction,
	setSelectedTransaction,
}: TransactionDeleteModalProps) => {
	const { isPending, remove } = useDeleteTransaction()

	const handleDeleteTransaction = async () => {
		if (!selectedTransaction) return
		await remove(selectedTransaction, {
			onSuccess: () => {
				toast.success('Transação excluída com sucesso!')
				setSelectedTransaction(null)
				overlayClose(modalId)
			},
			onError: (error) =>
				generateToastError(error, 'Erro ao excluir transação'),
		})
	}

	return (
		<Modal modalId={modalId} handleClose={() => setSelectedTransaction(null)}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<OctagonAlert size={64} className="text-amber-300" />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Você deseja excluir a transação?
						</Header>
						<Text>
							Ao excluir a transação os dados não poderão ser recuperados.
						</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							type="button"
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
							data-hs-overlay={`#${modalId}`}
							disabled={isPending}
							onClick={() => setSelectedTransaction(null)}
						>
							Cancelar
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							onClick={handleDeleteTransaction}
							isLoading={isPending}
							disabled={isPending}
						>
							Confirmar
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}
