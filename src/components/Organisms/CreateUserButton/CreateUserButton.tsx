'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRoundPlus } from 'lucide-react'
import { memo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/Atoms'
import { overlayOpen } from '@/constants'

import { UserDrawer } from '../UserDrawer'
import { UserSchema, UserSchemaType } from '../UserDrawer/UserDrawer.schema'

type CreateUserButtonProps = {
	drawerId: string
}

export const CreateUserButton = memo(({ drawerId }: CreateUserButtonProps) => {
	const methods = useForm<UserSchemaType>({
		defaultValues: {
			name: '',
			email: '',
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
				type="button"
				onClick={handleCreateEvent}
				leftIcon={<UserRoundPlus />}
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			>
				Criar um novo usuário
			</Button>
			<FormProvider {...methods}>
				<UserDrawer drawerId={drawerId} />
			</FormProvider>
		</>
	)
})

CreateUserButton.displayName = 'CreateUserButton'
