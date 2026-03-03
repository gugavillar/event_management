'use client'
import { OctagonAlert } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import type { SelectedTransaction } from '@/components/Templates'
import { TRANSACTION_MODAL_TYPE } from '@/constants'
import { useDeleteTransaction } from '@/services/queries/transactions/hooks'
import { generateToastError } from '@/utils/errors'

type TransactionDeleteModalProps = {
	selectedTransaction: SelectedTransaction | null
	setSelectedTransaction: Dispatch<SetStateAction<SelectedTransaction | null>>
}

export const TransactionDeleteModal = ({
	selectedTransaction,
	setSelectedTransaction,
}: TransactionDeleteModalProps) => {
	const { isPending, remove } = useDeleteTransaction()

	const handleDeleteTransaction = async () => {
		if (!selectedTransaction) return

		await remove(selectedTransaction.id, {
			onError: (error) => generateToastError(error, 'Erro ao excluir transação'),
			onSuccess: () => {
				toast.success('Transação excluída com sucesso!')
				setSelectedTransaction(null)
			},
		})
	}

	const handleCloseTransactionDeleteModal = () => {
		setSelectedTransaction(null)
	}

	return (
		<Modal
			onOpenChange={handleCloseTransactionDeleteModal}
			open={selectedTransaction?.modal === TRANSACTION_MODAL_TYPE.DELETE}
		>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<OctagonAlert className="text-amber-300" size={64} />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Você deseja excluir a transação?
						</Header>
						<Text>Ao excluir a transação os dados não poderão ser recuperados.</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
							disabled={isPending}
							onClick={handleCloseTransactionDeleteModal}
							type="button"
						>
							Cancelar
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							disabled={isPending}
							isLoading={isPending}
							onClick={handleDeleteTransaction}
						>
							Confirmar
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}
