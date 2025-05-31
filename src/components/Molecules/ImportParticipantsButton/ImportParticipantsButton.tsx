import { FileUp } from 'lucide-react'

import { Button } from '@/components/Atoms'
import { ImportParticipantsFileModal } from '@/components/Organisms'

type ImportParticipantsButtonProps = {
	label: string
	modalId: string
}

export const ImportParticipantsButton = ({
	label,
	modalId,
}: ImportParticipantsButtonProps) => {
	return (
		<>
			<Button
				type="button"
				data-hs-overlay={`#${modalId}`}
				leftIcon={<FileUp />}
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			>
				{label}
			</Button>
			<ImportParticipantsFileModal modalId={modalId} />
		</>
	)
}
