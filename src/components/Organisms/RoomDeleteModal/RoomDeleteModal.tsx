'use client'
import { OctagonAlert } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useDeleteRoom } from '@/services/queries/rooms'
import type { RoomAPI } from '@/services/queries/rooms/rooms.types'
import { generateToastError } from '@/utils/errors'

type RoomDeleteModalProps = {
	modalId: string
	selectedRoom: RoomAPI['id'] | null
	setSelectedRoom: Dispatch<SetStateAction<RoomAPI['id'] | null>>
}

export const RoomDeleteModal = ({
	modalId,
	selectedRoom,
	setSelectedRoom,
}: RoomDeleteModalProps) => {
	const { isPending, remove } = useDeleteRoom()

	const handleDeleteRoom = async () => {
		if (!selectedRoom) return
		await remove(selectedRoom, {
			onError: (error) => generateToastError(error, 'Erro ao excluir quarto'),
			onSuccess: () => {
				setSelectedRoom(null)
				toast.success('Quarto excluído com sucesso!')
				overlayClose(modalId)
			},
		})
	}

	const handleCloseRoomDeleteModal = () => {
		setSelectedRoom(null)
		overlayClose(modalId)
	}

	return (
		<Modal handleClose={handleCloseRoomDeleteModal} modalId={modalId}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<OctagonAlert className="text-amber-300" size={64} />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Você deseja excluir o quarto?
						</Header>
						<Text>
							Ao excluir o quarto todos os membros vinculados a ele ficaram sem
							nenhum quarto.
						</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
							disabled={isPending}
							onClick={handleCloseRoomDeleteModal}
							type="button"
						>
							Cancelar
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							disabled={isPending}
							isLoading={isPending}
							onClick={handleDeleteRoom}
						>
							Confirmar
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}
