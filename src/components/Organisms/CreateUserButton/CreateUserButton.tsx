'use client'
import { UserRoundPlus } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/components/Atoms'
import { overlayOpen } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { UserDrawer } from '../UserDrawer'
import {
	UserSchema,
	type UserSchemaType,
} from '../UserDrawer/UserDrawer.schema'

type CreateUserButtonProps = {
	drawerId: string
}

export const CreateUserButton = memo(({ drawerId }: CreateUserButtonProps) => {
	const methods = useForm<UserSchemaType>({
		defaultValues: {
			email: '',
			name: '',
			role: '',
		},
		mode: 'onChange',
		resolver: zodResolver(UserSchema),
	})

	const handleCreateEvent = () => {
		overlayOpen(drawerId)
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
				<UserDrawer drawerId={drawerId} />
			</FormProvider>
		</>
	)
})

CreateUserButton.displayName = 'CreateUserButton'
