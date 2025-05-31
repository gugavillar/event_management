import { FileUp } from 'lucide-react'

import { Button } from '@/components/Atoms'
import { ImportVolunteersFileModal } from '@/components/Organisms'

type ImportVolunteersButtonProps = {
	label: string
	modalId: string
}

export const ImportVolunteersButton = ({
	label,
	modalId,
}: ImportVolunteersButtonProps) => {
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
			<ImportVolunteersFileModal modalId={modalId} />
		</>
	)
}
