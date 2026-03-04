'use client'
import { OctagonAlert } from 'lucide-react'
import { type Dispatch, memo, type SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import type { SelectedVolunteer } from '@/components/Templates'
import { VOLUNTEER_MODAL_TYPE } from '@/constants'
import { useDeleteVolunteer } from '@/services/queries/volunteers'
import { generateToastError } from '@/utils/errors'

type VolunteerDeleteModalProps = {
	selectedVolunteer: SelectedVolunteer | null
	setSelectedVolunteer: Dispatch<SetStateAction<SelectedVolunteer | null>>
}

export const VolunteerDeleteModal = memo(({ selectedVolunteer, setSelectedVolunteer }: VolunteerDeleteModalProps) => {
	const { remove, isPending } = useDeleteVolunteer()

	const handleDeleteVolunteer = async () => {
		if (!selectedVolunteer?.id) return

		await remove(selectedVolunteer.id, {
			onError: (error) => generateToastError(error, 'Erro ao excluir voluntário'),
			onSuccess: () => {
				setSelectedVolunteer(null)
				toast.success('Voluntário excluído com sucesso!')
			},
		})
	}

	const handleCloseVolunteerDeleteModal = () => {
		setSelectedVolunteer(null)
	}

	return (
		<Modal
			onOpenChange={handleCloseVolunteerDeleteModal}
			open={selectedVolunteer?.modal === VOLUNTEER_MODAL_TYPE.DELETE}
		>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<OctagonAlert className="text-amber-300" size={64} />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Você deseja excluir o voluntário?
						</Header>
						<Text>Ao excluir o voluntário todos os dados que vinculados a ele serão excluídos.</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
							disabled={isPending}
							onClick={handleCloseVolunteerDeleteModal}
							type="button"
						>
							Cancelar
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							disabled={isPending}
							isLoading={isPending}
							onClick={handleDeleteVolunteer}
						>
							Confirmar
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
})

VolunteerDeleteModal.displayName = 'VolunteerDeleteModal'
