import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/Atoms'
import { MODALS_IDS } from '@/constants'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'

type CreateVolunteerFunctionButtonProps = {
	setSelectedFunction: Dispatch<
		SetStateAction<VolunteersFunctionsFromAPI | null>
	>
}

export const CreateVolunteerFunctionButton = ({
	setSelectedFunction,
}: CreateVolunteerFunctionButtonProps) => {
	return (
		<Button
			className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			data-hs-overlay={`#${MODALS_IDS.CREATE_OR_UPDATE_FUNCTION_MODAL}`}
			onClick={() => setSelectedFunction(null)}
		>
			Criar nova função
		</Button>
	)
}
