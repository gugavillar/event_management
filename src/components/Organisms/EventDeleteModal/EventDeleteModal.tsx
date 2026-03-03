'use client'
import { OctagonAlert } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import type { SelectedEvent } from '@/components/Templates'
import { EVENTS_MODAL_TYPE } from '@/constants'
import { useDeleteEvent } from '@/services/queries/events'
import { generateToastError } from '@/utils/errors'

type EventDeleteModalProps = {
	selectedEvent: SelectedEvent | null
	setSelectedEvent: Dispatch<SetStateAction<SelectedEvent | null>>
}

export const EventDeleteModal = ({ selectedEvent, setSelectedEvent }: EventDeleteModalProps) => {
	const { remove, isPending } = useDeleteEvent()

	const handleDeleteEvent = async () => {
		if (!selectedEvent) return
		await remove(selectedEvent.id, {
			onError: (error) => generateToastError(error, 'Erro ao excluir evento'),
			onSuccess: () => {
				setSelectedEvent(null)
				toast.success('Evento excluído com sucesso!')
			},
		})
	}

	const handleCloseEventDeleteModal = () => {
		setSelectedEvent(null)
	}

	return (
		<Modal onOpenChange={handleCloseEventDeleteModal} open={selectedEvent?.modal === EVENTS_MODAL_TYPE.DELETE}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<OctagonAlert className="text-amber-300" size={64} />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Você deseja excluir o evento?
						</Header>
						<Text>Ao excluir o evento todos os dados que vinculados a ele serão excluídos.</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
							disabled={isPending}
							onClick={handleCloseEventDeleteModal}
							type="button"
						>
							Cancelar
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							disabled={isPending}
							isLoading={isPending}
							onClick={handleDeleteEvent}
						>
							Confirmar
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}
