import { MdOutlineCloudUpload } from 'react-icons/md'

import { Button } from '@/components/Atoms'

type ImportButtonProps = {
	label: string
	modalId: string
}

export const ImportButton = ({ label, modalId }: ImportButtonProps) => {
	return (
		<>
			<Button
				type="button"
				data-hs-overlay={`#${modalId}`}
				leftIcon={<MdOutlineCloudUpload />}
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			>
				{label}
			</Button>
		</>
	)
}
