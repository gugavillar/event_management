import { Wrench } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/Atoms'
import { overlayOpen } from '@/constants'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'

import { CreateVolunteerFunctionModal } from '../CreateVolunteerFunctionModal'

type CreateVolunteerFunctionButtonProps = {
	modalId: string
	selectedFunction: VolunteersFunctionsFromAPI | null
	setSelectedFunction: Dispatch<
		SetStateAction<VolunteersFunctionsFromAPI | null>
	>
}

export const CreateVolunteerFunctionButton = ({
	setSelectedFunction,
	selectedFunction,
	modalId,
}: CreateVolunteerFunctionButtonProps) => {
	const handleOpenCreateVolunteerFunctionModal = () => {
		setSelectedFunction(null)
		overlayOpen(modalId)
	}

	return (
		<>
			<Button
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				leftIcon={<Wrench />}
				onClick={handleOpenCreateVolunteerFunctionModal}
			>
				Criar função
			</Button>
			<CreateVolunteerFunctionModal
				modalId={modalId}
				selectedFunction={selectedFunction}
				setSelectedFunction={setSelectedFunction}
			/>
		</>
	)
}
