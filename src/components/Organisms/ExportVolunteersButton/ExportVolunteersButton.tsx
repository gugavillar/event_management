'use client'
import { FileDown } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/components/Atoms'
import { MODALS_IDS, overlayOpen } from '@/constants'

import { ExportVolunteersDataModal } from '../ExportVolunteersDataModal'

export const ExportVolunteersButton = memo(() => {
	const handleOpenExportVolunteersModal = () => {
		overlayOpen(MODALS_IDS.VOLUNTEER_EXPORT_MODAL)
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
			<ExportVolunteersDataModal modalId={MODALS_IDS.VOLUNTEER_EXPORT_MODAL} />
		</>
	)
})

ExportVolunteersButton.displayName = 'ExportVolunteersButton'
