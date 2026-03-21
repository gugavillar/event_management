'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRoundPlus } from 'lucide-react'
import { memo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/Atoms'
import { USERS_MODAL_TYPE } from '@/constants'

import { UserDrawer } from '../UserDrawer'
import { UserSchema, type UserSchemaType } from '../UserDrawer/UserDrawer.schema'

export const CreateUserButton = memo(() => {
	const [isOpen, setIsOpen] = useState<USERS_MODAL_TYPE | null>(null)
	const methods = useForm<UserSchemaType>({
		defaultValues: {
			email: '',
			name: '',
		},
		mode: 'onChange',
		resolver: zodResolver(UserSchema),
	})

	const handleCreateEvent = () => {
		setIsOpen(USERS_MODAL_TYPE.CREATE)
	}

	return (
		<>
			<Button
				className="items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 md:min-w-60"
				leftIcon={<UserRoundPlus />}
				onClick={handleCreateEvent}
				type="button"
			>
				<span className="max-md:hidden">Criar um novo usuário</span>
			</Button>
			<FormProvider {...methods}>
				<UserDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
			</FormProvider>
		</>
	)
})

CreateUserButton.displayName = 'CreateUserButton'
