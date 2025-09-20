'use client'
import { OctagonAlert } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useDeleteEvent } from '@/services/queries/events'
import { EventsAPI } from '@/services/queries/events/event.type'
import { generateToastError } from '@/utils/errors'

type EventDeleteModalProps = {
	modalId: string
	selectedEvent: EventsAPI['id'] | null
	setSelectedEvent: Dispatch<SetStateAction<EventsAPI['id'] | null>>
}

export const EventDeleteModal = ({
	modalId,
	selectedEvent,
	setSelectedEvent,
}: EventDeleteModalProps) => {
	const { remove, isPending } = useDeleteEvent()

	const handleDeleteEvent = async () => {
		if (!selectedEvent) return
		await remove(selectedEvent, {
			onSuccess: () => {
				setSelectedEvent(null)
				toast.success('Evento excluído com sucesso!')
				overlayClose(modalId)
			},
			onError: (error) => generateToastError(error, 'Erro ao excluir evento'),
		})
	}

	const handleCloseEventDeleteModal = () => {
		setSelectedEvent(null)
		overlayClose(modalId)
	}

	return (
		<Modal modalId={modalId} handleClose={handleCloseEventDeleteModal}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<OctagonAlert size={64} className="text-amber-300" />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Você deseja excluir o evento?
						</Header>
						<Text>
							Ao excluir o evento todos os dados que vinculados a ele serão
							excluídos.
						</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							type="button"
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
							disabled={isPending}
							onClick={handleCloseEventDeleteModal}
						>
							Cancelar
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							onClick={handleDeleteEvent}
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
