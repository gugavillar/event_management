'use client'
import { Dispatch, memo, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { IoMdAlert } from 'react-icons/io'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useResetPassword } from '@/services/queries/users'
import { UserAPI } from '@/services/queries/users/users.type'

type UserResetPasswordModalProps = {
	modalId: string
	selectedUser: UserAPI['id'] | null
	setSelectedUser: Dispatch<SetStateAction<UserAPI['id'] | null>>
}

export const UserResetPasswordModal = memo(
	({ modalId, selectedUser, setSelectedUser }: UserResetPasswordModalProps) => {
		const { update, isPending } = useResetPassword()

		const handleResetPassword = async () => {
			if (!selectedUser) return

			await update(
				{ userId: selectedUser },
				{
					onSuccess: () => {
						toast.success('Senha redefinida com sucesso!')
						overlayClose(modalId)
					},
					onError: () => toast.error('Erro ao redefinir a senha'),
				},
			)
		}

		const handleClose = () => {
			setSelectedUser(null)
			overlayClose(modalId)
		}

		return (
			<Modal modalId={modalId} handleClose={handleClose}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<IoMdAlert size={64} className="text-amber-300" />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								Você deseja redefinir a senha desse usuário?
							</Header>
							<Text>
								Ao confirmar, a senha deste usuário será redefinida para o
								padrão. Será necessário criar uma nova senha no próximo login.
							</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								type="button"
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
								onClick={handleClose}
								disabled={isPending}
							>
								Cancelar
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								onClick={handleResetPassword}
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

UserResetPasswordModal.displayName = 'UserResetPasswordModal'
