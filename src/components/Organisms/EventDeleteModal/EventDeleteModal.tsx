'use client'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { IoMdAlert } from 'react-icons/io'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useDeleteEvent } from '@/services/queries/events'
import { EventsFromAPI } from '@/services/queries/events/event.type'

type EventDeleteModalProps = {
	modalId: string
	selectedEvent: EventsFromAPI['id'] | null
	setSelectedEvent: Dispatch<SetStateAction<EventsFromAPI['id'] | null>>
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
			onError: () => toast.error('Erro ao excluir evento'),
		})
	}

	return (
		<Modal modalId={modalId}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<IoMdAlert size={64} className="text-amber-300" />
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
							data-hs-overlay={`#${modalId}`}
							disabled={isPending}
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
