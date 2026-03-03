'use client'
import { FileDown } from 'lucide-react'
import { memo, useState } from 'react'

import { Button } from '@/components/Atoms'
import { VOLUNTEER_MODAL_TYPE } from '@/constants'

import { ExportVolunteersDataModal } from '../ExportVolunteersDataModal'

export type SelectedVolunteer = {
	modal: VOLUNTEER_MODAL_TYPE | null
}

export const ExportVolunteersButton = memo(() => {
	const [open, setOpen] = useState<SelectedVolunteer>({ modal: null })
	const handleOpenExportVolunteersModal = () => {
		setOpen({ modal: VOLUNTEER_MODAL_TYPE.EXPORT })
	}
	return (
		<>
			<Button
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				leftIcon={<FileDown />}
				onClick={handleOpenExportVolunteersModal}
			>
				Export voluntários
			</Button>
			<ExportVolunteersDataModal open={open} setOpen={setOpen} />
		</>
	)
})

ExportVolunteersButton.displayName = 'ExportVolunteersButton'
