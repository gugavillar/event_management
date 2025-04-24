import { Button } from '@/components/Atoms'
import { MODALS_IDS } from '@/constants'

import { CreateVolunteerFunctionModal } from '../CreateVolunteerFunctionModal'

export const CreateVolunteerFunctionButton = () => {
	return (
		<>
			<Button
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				data-hs-overlay={`#${MODALS_IDS.CREATE_FUNCTION_MODAL}`}
			>
				Criar nova função
			</Button>
			<CreateVolunteerFunctionModal
				modalId={MODALS_IDS.CREATE_FUNCTION_MODAL}
			/>
		</>
	)
}
