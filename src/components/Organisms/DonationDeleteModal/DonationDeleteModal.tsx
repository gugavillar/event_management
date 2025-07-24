'use client'
import { OctagonAlert } from 'lucide-react'
import { Dispatch, memo, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useDeleteDonation } from '@/services/queries/donations'
import { DonationAPI } from '@/services/queries/donations/donations.types'
import { generateToastError } from '@/utils/errors'

type DonationDeleteModalProps = {
	modalId: string
	selectedDonation: DonationAPI['id'] | null
	setSelectedDonation: Dispatch<SetStateAction<DonationAPI['id'] | null>>
}

export const DonationDeleteModal = memo(
	({
		modalId,
		selectedDonation,
		setSelectedDonation,
	}: DonationDeleteModalProps) => {
		const { remove, isPending } = useDeleteDonation()

		const handleDeleteDonation = async () => {
			if (!selectedDonation) return

			await remove(selectedDonation, {
				onSuccess: () => {
					setSelectedDonation(null)
					toast.success('Doação excluída com sucesso!')
					overlayClose(modalId)
				},
				onError: (error) => generateToastError(error, 'Erro ao excluir doação'),
			})
		}

		const handleClose = () => {
			setSelectedDonation(null)
		}

		return (
			<Modal modalId={modalId} handleClose={handleClose}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<OctagonAlert size={64} className="text-amber-300" />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								Você deseja excluir a doação?
							</Header>
							<Text>
								Ao excluir a doação todos as informações serão excluídas e não
								podem ser recuperadas.
							</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								type="button"
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
								data-hs-overlay={`#${modalId}`}
								disabled={isPending}
								onClick={handleClose}
							>
								Cancelar
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								onClick={handleDeleteDonation}
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
	},
)

DonationDeleteModal.displayName = 'DonationDeleteModal'
