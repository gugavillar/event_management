'use client'
import { OctagonAlert } from 'lucide-react'
import { Dispatch, memo, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useDeleteVolunteer } from '@/services/queries/volunteers'
import { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'
import { generateToastError } from '@/utils/errors'

type VolunteerDeleteModalProps = {
	modalId: string
	selectedVolunteer: VolunteersAPI['id'] | null
	setSelectedVolunteer: Dispatch<SetStateAction<VolunteersAPI['id'] | null>>
}

export const VolunteerDeleteModal = memo(
	({
		modalId,
		selectedVolunteer,
		setSelectedVolunteer,
	}: VolunteerDeleteModalProps) => {
		const { remove, isPending } = useDeleteVolunteer()

		const handleDeleteVolunteer = async () => {
			if (!selectedVolunteer) return

			await remove(selectedVolunteer, {
				onSuccess: () => {
					setSelectedVolunteer(null)
					toast.success('Voluntário excluído com sucesso!')
					overlayClose(modalId)
				},
				onError: (error) =>
					generateToastError(error, 'Erro ao excluir voluntário'),
			})
		}

		return (
			<Modal modalId={modalId} handleClose={() => setSelectedVolunteer(null)}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<OctagonAlert size={64} className="text-amber-300" />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								Você deseja excluir o voluntário?
							</Header>
							<Text>
								Ao excluir o voluntário todos os dados que vinculados a ele
								serão excluídos.
							</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								type="button"
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
								data-hs-overlay={`#${modalId}`}
								disabled={isPending}
								onClick={() => setSelectedVolunteer(null)}
							>
								Cancelar
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								onClick={handleDeleteVolunteer}
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

VolunteerDeleteModal.displayName = 'VolunteerDeleteModal'
