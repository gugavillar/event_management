'use client'
import { OctagonAlert } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useDeleteGroup } from '@/services/queries/groups'
import type { GroupAPI } from '@/services/queries/groups/groups.types'
import { generateToastError } from '@/utils/errors'

type GroupDeleteModalProps = {
	modalId: string
	selectedGroup: GroupAPI['id'] | null
	setSelectedGroup: Dispatch<SetStateAction<GroupAPI['id'] | null>>
}

export const GroupDeleteModal = ({ modalId, selectedGroup, setSelectedGroup }: GroupDeleteModalProps) => {
	const { isPending, remove } = useDeleteGroup()

	const handleDeleteGroup = async () => {
		if (!selectedGroup) return
		await remove(selectedGroup, {
			onError: (error) => generateToastError(error, 'Erro ao excluir grupo'),
			onSuccess: () => {
				setSelectedGroup(null)
				toast.success('Grupo excluído com sucesso!')
				overlayClose(modalId)
			},
		})
	}

	const handleCloseGroupDeleteModal = () => {
		setSelectedGroup(null)
		overlayClose(modalId)
	}

	return (
		<Modal handleClose={handleCloseGroupDeleteModal} modalId={modalId}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<OctagonAlert className="text-amber-300" size={64} />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Você deseja excluir o grupo?
						</Header>
						<Text>Ao excluir o grupo todos os membros vinculados a ele ficaram sem nenhum grupo.</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
							disabled={isPending}
							onClick={handleCloseGroupDeleteModal}
							type="button"
						>
							Cancelar
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							disabled={isPending}
							isLoading={isPending}
							onClick={handleDeleteGroup}
						>
							Confirmar
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}
