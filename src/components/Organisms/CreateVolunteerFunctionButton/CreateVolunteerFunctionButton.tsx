import { Wrench } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/Atoms'
import type { SelectedFunction } from '@/components/Templates'
import { VOLUNTEER_MODAL_TYPE } from '@/constants'

import { CreateVolunteerFunctionModal } from '../CreateVolunteerFunctionModal'

type CreateVolunteerFunctionButtonProps = {
	selectedFunction: SelectedFunction | null
	setSelectedFunction: Dispatch<SetStateAction<SelectedFunction | null>>
}

export const CreateVolunteerFunctionButton = ({
	setSelectedFunction,
	selectedFunction,
}: CreateVolunteerFunctionButtonProps) => {
	const handleOpenCreateVolunteerFunctionModal = () => {
		setSelectedFunction({ function: null, modal: VOLUNTEER_MODAL_TYPE.CREATE_OR_EDIT_FUNCTION })
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
			<CreateVolunteerFunctionModal selectedFunction={selectedFunction} setSelectedFunction={setSelectedFunction} />
		</>
	)
}
