'use client'
import type { Dispatch, SetStateAction } from 'react'
import { type SubmitHandler, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import { InputField } from '@/components/Molecules'
import { USERS_MODAL_TYPE } from '@/constants'
import { useCreateUser } from '@/services/queries/users'

import type { UserSchemaType } from './UserDrawer.schema'

type UserDrawerProps = {
	isOpen: USERS_MODAL_TYPE | null
	setIsOpen: Dispatch<SetStateAction<USERS_MODAL_TYPE | null>>
}

export const UserDrawer = ({ isOpen, setIsOpen }: UserDrawerProps) => {
	const { handleSubmit, reset } = useFormContext<UserSchemaType>()
	const { create, isPending: isPendingCreate } = useCreateUser()

	const onSubmit: SubmitHandler<UserSchemaType> = async (values) => {
		if (!values) return

		await create(values, {
			onError: () => toast.error('Erro ao criar usuário'),
			onSuccess: () => {
				reset()
				toast.success('Usuário criado com sucesso!')
				setIsOpen(null)
			},
		})
	}

	const handleClose = () => {
		setIsOpen(null)
		reset()
	}

	return (
		<Drawer handleClose={handleClose} headingTitle="Novo usuário" isOpen={isOpen === USERS_MODAL_TYPE.CREATE}>
			<DrawerBody>
				<InputField fieldName="name">Nome do usuário</InputField>
				<InputField fieldName="email">Email do usuário</InputField>
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
