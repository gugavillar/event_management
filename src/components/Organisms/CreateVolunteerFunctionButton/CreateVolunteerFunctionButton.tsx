import { Dispatch, SetStateAction } from 'react'
import { FaTools } from 'react-icons/fa'

import { Button } from '@/components/Atoms'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'

type CreateVolunteerFunctionButtonProps = {
	modalId: string
	setSelectedFunction: Dispatch<
		SetStateAction<VolunteersFunctionsFromAPI | null>
	>
}

export const CreateVolunteerFunctionButton = ({
	setSelectedFunction,
	modalId,
}: CreateVolunteerFunctionButtonProps) => {
	return (
		<Button
			className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			data-hs-overlay={`#${modalId}`}
			leftIcon={<FaTools />}
			onClick={() => setSelectedFunction(null)}
		>
			Criar função
		</Button>
	)
}
