'use client'
import { OctagonAlert } from 'lucide-react'
import { type Dispatch, memo, type SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useDeleteParticipant } from '@/services/queries/participants'
import type { ParticipantsAPI } from '@/services/queries/participants/participants.type'
import { generateToastError } from '@/utils/errors'

type ParticipantDeleteModalProps = {
	modalId: string
	selectedParticipant: ParticipantsAPI['id'] | null
	setSelectedParticipant: Dispatch<SetStateAction<ParticipantsAPI['id'] | null>>
}

export const ParticipantDeleteModal = memo(
	({ modalId, selectedParticipant, setSelectedParticipant }: ParticipantDeleteModalProps) => {
		const { remove, isPending } = useDeleteParticipant()

		const handleDeleteParticipant = async () => {
			if (!selectedParticipant) return

			await remove(selectedParticipant, {
				onError: (error) => generateToastError(error, 'Erro ao excluir participante'),
				onSuccess: () => {
					setSelectedParticipant(null)
					toast.success('Participante excluído com sucesso!')
					overlayClose(modalId)
				},
			})
		}

		const handleCloseParticipantDeleteModal = () => {
			setSelectedParticipant(null)
			overlayClose(modalId)
		}

		return (
			<Modal handleClose={handleCloseParticipantDeleteModal} modalId={modalId}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<OctagonAlert className="text-amber-300" size={64} />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								Você deseja excluir o participante?
							</Header>
							<Text>Ao excluir o participante todos os dados que vinculados a ele serão excluídos.</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
								disabled={isPending}
								onClick={handleCloseParticipantDeleteModal}
								type="button"
							>
								Cancelar
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								disabled={isPending}
								isLoading={isPending}
								onClick={handleDeleteParticipant}
							>
								Confirmar
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
)

ParticipantDeleteModal.displayName = 'ParticipantDeleteModal'
