'use client'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import { InputField, SelectField } from '@/components/Molecules'
import { overlayClose, RolesTypesSelectOptions } from '@/constants'
import { useCreateUser } from '@/services/queries/users'
import { type SubmitHandler, useFormContext } from 'react-hook-form'
import type { UserSchemaType } from './UserDrawer.schema'

type UserDrawerProps = {
	drawerId: string
}

export const UserDrawer = ({ drawerId }: UserDrawerProps) => {
	const { handleSubmit, reset } = useFormContext<UserSchemaType>()
	const { create, isPending: isPendingCreate } = useCreateUser()

	const onSubmit: SubmitHandler<UserSchemaType> = async (values) => {
		if (!values) return

		await create(values, {
			onError: () => toast.error('Erro ao criar usuário'),
			onSuccess: () => {
				reset()
				toast.success('Usuário criado com sucesso!')
				overlayClose(drawerId)
			},
		})
	}

	return (
		<Drawer drawerId={drawerId} headingTitle="Novo usuário">
			<DrawerBody>
				<InputField fieldName="name">Nome do usuário</InputField>
				<InputField fieldName="email">Email do usuário</InputField>
				<SelectField
					fieldName="role"
					options={RolesTypesSelectOptions}
					placeholder="Selecione a permissão do usuário"
				>
					Permissão
				</SelectField>
			</DrawerBody>
			<DrawerFooter>
				<Button
					className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					disabled={isPendingCreate}
					isLoading={isPendingCreate}
					onClick={handleSubmit(onSubmit)}
					type="submit"
				>
					Criar usuário
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
