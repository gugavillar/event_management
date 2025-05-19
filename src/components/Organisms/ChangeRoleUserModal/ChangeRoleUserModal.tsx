'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal } from '@/components/Atoms'
import { SelectField } from '@/components/Molecules'
import { overlayClose, ROLES, RolesTypesSelectOptions } from '@/constants'
import { useUpdateUserRole } from '@/services/queries/users'
import { UserAPI } from '@/services/queries/users/users.type'

import {
	ChangeRoleUserSchema,
	ChangeRoleUserType,
} from './ChangeRoleUserModal.schema'

type ChangeRoleUserModalProps = {
	modalId: string
	selectedUser: UserAPI['id'] | null
	setSelectedUser: Dispatch<SetStateAction<UserAPI['id'] | null>>
}

export const ChangeRoleUserModal = ({
	modalId,
	selectedUser,
	setSelectedUser,
}: ChangeRoleUserModalProps) => {
	const { isPending, update } = useUpdateUserRole()
	const methods = useForm<ChangeRoleUserType>({
		defaultValues: {
			role: '',
		},
		resolver: zodResolver(ChangeRoleUserSchema),
	})

	const handleSubmit: SubmitHandler<ChangeRoleUserType> = async (values) => {
		if (!selectedUser) return

		await update(
			{ role: values.role as ROLES, userId: selectedUser },
			{
				onSuccess: () => {
					setSelectedUser(null)
					methods.reset()
					toast.success('Permissão atualizada com sucesso!')
					overlayClose(modalId)
				},
				onError: () => toast.error('Erro ao alterar a permissão'),
			},
		)
	}

	return (
		<Modal modalId={modalId} handleClose={() => setSelectedUser(null)}>
			<FormProvider {...methods}>
				<div className="flex w-full flex-col items-center justify-center">
					<div className="flex w-full flex-col items-center justify-between gap-6">
						<Header as="h3" className="text-2xl">
							Alterar a permissão do usuário
						</Header>
						<SelectField
							fieldName="role"
							placeholder="Selecione o tipo de permissão"
							options={RolesTypesSelectOptions}
						>
							Tipo de permissão
						</SelectField>
						<Button
							className="w-full max-w-60 items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							type="submit"
							onClick={methods.handleSubmit(handleSubmit)}
							disabled={!methods.formState.isValid}
							isLoading={isPending}
						>
							Alterar a permissão
						</Button>
					</div>
				</div>
			</FormProvider>
		</Modal>
	)
}
