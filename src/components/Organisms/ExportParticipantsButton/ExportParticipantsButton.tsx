'use client'
import { FileDown } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/components/Atoms'
import { MODALS_IDS, overlayOpen } from '@/constants'

import { ExportParticipantsDataModal } from '../ExportParticipantsDataModal'

type ExportParticipantsButtonProps = {
	isInterested?: boolean
}

export const ExportParticipantsButton = memo(({ isInterested }: ExportParticipantsButtonProps) => {
	const handleOpenExportParticipantsModal = () => {
		overlayOpen(MODALS_IDS.PARTICIPANT_EXPORT_MODAL)
	}

	return (
		<>
			<Button
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				leftIcon={<FileDown />}
				onClick={handleOpenExportParticipantsModal}
			>
				{isInterested ? 'Export interessados' : 'Export participantes'}
			</Button>
			<ExportParticipantsDataModal isInterested={isInterested} modalId={MODALS_IDS.PARTICIPANT_EXPORT_MODAL} />
		</>
	)
})

ExportParticipantsButton.displayName = 'ExportParticipantsButton'
