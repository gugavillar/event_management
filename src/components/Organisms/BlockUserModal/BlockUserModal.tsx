'use client'
import { OctagonAlert } from 'lucide-react'
import { type Dispatch, memo, type SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useBlockOrUnblockUser } from '@/services/queries/users'
import type { UserAPI } from '@/services/queries/users/users.type'

type BlockUserModalProps = {
	modalId: string
	selectedUser: UserAPI['id'] | null
	setSelectedUser: Dispatch<SetStateAction<UserAPI['id'] | null>>
}

export const BlockUserModal = memo(
	({ modalId, selectedUser, setSelectedUser }: BlockUserModalProps) => {
		const { update, isPending } = useBlockOrUnblockUser()
		const handleBlockOrUnblockUser = async (block: boolean) => {
			if (!selectedUser) return
			await update(
				{ blocked: block, userId: selectedUser },
				{
					onError: () => toast.error('Erro ao bloquear ou desbloquear usuário'),
					onSuccess: () => {
						setSelectedUser(null)
						toast.success(
							block
								? 'Usuário bloqueado com sucesso!'
								: 'Usuário desbloqueado com sucesso!'
						)
						overlayClose(modalId)
					},
				}
			)
		}

		return (
			<Modal handleClose={() => setSelectedUser(null)} modalId={modalId}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<OctagonAlert className="text-amber-300" size={64} />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								Deseja bloquear ou desbloquear acesso desse usuário?
							</Header>
							<Text>
								Bloquear remove o acesso do usuário à aplicação. Desbloquear o
								restabelece.
							</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								className="w-full items-center justify-center bg-red-500 text-gray-50 transition-colors duration-500 hover:bg-red-400 hover:text-slate-800"
								disabled={isPending}
								isLoading={isPending}
								onClick={() => handleBlockOrUnblockUser(true)}
								type="button"
							>
								Bloquear
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								disabled={isPending}
								isLoading={isPending}
								onClick={() => handleBlockOrUnblockUser(false)}
							>
								Desbloquear
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
)

BlockUserModal.displayName = 'BlockUserModal'
