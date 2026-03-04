'use client'
import { OctagonAlert } from 'lucide-react'
import { type Dispatch, memo, type SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import type { SelectedUser } from '@/components/Templates'
import { USERS_MODAL_TYPE } from '@/constants'
import { useResetPassword } from '@/services/queries/users'

type UserResetPasswordModalProps = {
	selectedUser: SelectedUser | null
	setSelectedUser: Dispatch<SetStateAction<SelectedUser | null>>
}

export const UserResetPasswordModal = memo(({ selectedUser, setSelectedUser }: UserResetPasswordModalProps) => {
	const { update, isPending } = useResetPassword()

	const handleResetPassword = async () => {
		if (!selectedUser) return

		await update(
			{ userId: selectedUser.id },
			{
				onError: () => toast.error('Erro ao redefinir a senha'),
				onSuccess: () => {
					toast.success('Senha redefinida com sucesso!')
				},
			}
		)
	}

	const handleClose = () => {
		setSelectedUser(null)
	}

	return (
		<Modal onOpenChange={handleClose} open={selectedUser?.modal === USERS_MODAL_TYPE.RESET_PASSWORD}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<OctagonAlert className="text-amber-300" size={64} />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Você deseja redefinir a senha desse usuário?
						</Header>
						<Text>
							Ao confirmar, a senha deste usuário será redefinida para o padrão. Será necessário criar uma nova senha no
							próximo login.
						</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
							disabled={isPending}
							onClick={handleClose}
							type="button"
						>
							Cancelar
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							disabled={isPending}
							isLoading={isPending}
							onClick={handleResetPassword}
						>
							Confirmar
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
})

UserResetPasswordModal.displayName = 'UserResetPasswordModal'
