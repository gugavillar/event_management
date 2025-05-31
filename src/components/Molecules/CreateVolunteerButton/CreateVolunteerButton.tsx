'use client'
import { memo } from 'react'
import { FaPlus } from 'react-icons/fa6'

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
				leftIcon={<FaPlus />}
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			>
				Criar voluntário
			</Button>
		)
	},
)

CreateVolunteerButton.displayName = 'CreateVolunteerButton'
