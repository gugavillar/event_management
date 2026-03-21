'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Checkbox, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import type { SelectedUser } from '@/components/Templates'
import { PAGES, USERS_MODAL_TYPE } from '@/constants'
import { useGetUser, useUpdateUserRole } from '@/services/queries/users'
import type { UserAPI } from '@/services/queries/users/users.type'

import { type UserPermissionDrawerType, userPermissionDrawerSchema } from './UserPermissionDrawer.schema'

type UserPermissionDrawerProps = {
	selectedUser: SelectedUser | null
	setSelectedUser: Dispatch<SetStateAction<SelectedUser | null>>
}

export const UserPermissionDrawer = ({ selectedUser, setSelectedUser }: UserPermissionDrawerProps) => {
	const { isPending, update } = useUpdateUserRole()
	const { data, isLoading } = useGetUser((selectedUser?.id as UserAPI['id']) ?? '')
	const {
		register,
		formState: { isValid, isDirty },
		handleSubmit,
		reset,
	} = useForm<UserPermissionDrawerType>({
		defaultValues: {
			dashboard: true,
			donations: false,
			events: false,
			participants: {
				interest: false,
				list: false,
				payment: false,
				picture: false,
			},
			rooms: false,
			transactions: false,
			users: false,
			volunteers: {
				functions: false,
				list: false,
				payment: false,
			},
		},
		mode: 'onChange',
		resolver: zodResolver(userPermissionDrawerSchema),
	})

	const handleClose = () => {
		setSelectedUser(null)
	}

	const handleSubmitData = handleSubmit(async (data) => {
		if (!selectedUser) return
		await update(
			{
				permissions: data,
				userId: selectedUser.id,
			},
			{
				onError: () => toast.error('Erro ao alterar a permissões'),
				onSuccess: () => {
					handleClose()
					reset()
					toast.success('Permissões atualizada com sucesso!')
				},
			}
		)
	})

	useEffect(() => {
		if (!data) return
		const parsedRoles = JSON.parse(data.role)
		reset(parsedRoles, { keepDefaultValues: true })
	}, [data, reset])

	return (
		<Drawer
			handleClose={handleClose}
			headingTitle="Permissões de acesso"
			isOpen={selectedUser?.modal === USERS_MODAL_TYPE.USER_PERMISSION}
		>
			<DrawerBody isLoading={isLoading}>
				<div className="flex flex-col justify-center">
					<p className="text-gray-800/50 text-sm">
						Selecione as páginas que o usuário poderá acessar.
						<br />
						As opções marcadas liberam o acesso, enquanto as desmarcadas ficam indisponíveis.
					</p>
				</div>
				<div className="flex flex-col gap-4">
					{PAGES.map(({ fieldName, label }) => (
						<div className="grid grid-cols-[1fr_auto]" key={label}>
							<p>{label}</p>
							<Checkbox className="size-5" {...register(fieldName)} disabled={fieldName === 'dashboard'} />
						</div>
					))}
				</div>
			</DrawerBody>
			<DrawerFooter>
				<Button
					className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					disabled={!isDirty || !isValid}
					isLoading={isPending}
					onClick={handleSubmitData}
					type="button"
				>
					Salvar
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
