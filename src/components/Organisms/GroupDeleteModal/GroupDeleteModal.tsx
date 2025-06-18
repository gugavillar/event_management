'use client'
import { OctagonAlert } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useDeleteGroup } from '@/services/queries/groups'
import { GroupAPI } from '@/services/queries/groups/groups.types'
import { generateToastError } from '@/utils/errors'

type GroupDeleteModalProps = {
	modalId: string
	selectedGroup: GroupAPI['id'] | null
	setSelectedGroup: Dispatch<SetStateAction<GroupAPI['id'] | null>>
}

export const GroupDeleteModal = ({
	modalId,
	selectedGroup,
	setSelectedGroup,
}: GroupDeleteModalProps) => {
	const { isPending, remove } = useDeleteGroup()

	const handleDeleteGroup = async () => {
		if (!selectedGroup) return
		await remove(selectedGroup, {
			onSuccess: () => {
				setSelectedGroup(null)
				toast.success('Grupo excluído com sucesso!')
				overlayClose(modalId)
			},
			onError: (error) => generateToastError(error, 'Erro ao excluir grupo'),
		})
	}

	return (
		<Modal modalId={modalId} handleClose={() => setSelectedGroup(null)}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<OctagonAlert size={64} className="text-amber-300" />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Você deseja excluir o grupo?
						</Header>
						<Text>
							Ao excluir o grupo todos os membros vinculados a ele ficaram sem
							nenhum grupo.
						</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							type="button"
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
							data-hs-overlay={`#${modalId}`}
							disabled={isPending}
							onClick={() => setSelectedGroup(null)}
						>
							Cancelar
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							onClick={handleDeleteGroup}
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
