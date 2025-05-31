'use client'
import { UserRoundPlus } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/components/Atoms'

type CreateVolunteerButtonProps = {
	handleCreateVolunteer: VoidFunction
}

export const CreateVolunteerButton = memo(
	({ handleCreateVolunteer }: CreateVolunteerButtonProps) => {
		return (
			<Button
				type="button"
				onClick={handleCreateVolunteer}
				leftIcon={<UserRoundPlus />}
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			>
				Criar voluntário
			</Button>
		)
	},
)

CreateVolunteerButton.displayName = 'CreateVolunteerButton'
