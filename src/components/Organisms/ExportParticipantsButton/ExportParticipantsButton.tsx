'use client'
import { FileDown } from 'lucide-react'
import { memo, useState } from 'react'

import { Button } from '@/components/Atoms'
import { PARTICIPANT_MODAL_TYPE } from '@/constants'

import { ExportParticipantsDataModal } from '../ExportParticipantsDataModal'

type ExportParticipantsButtonProps = {
	isInterested?: boolean
}

export type SelectedParticipant = {
	modal: PARTICIPANT_MODAL_TYPE | null
}

export const ExportParticipantsButton = memo(({ isInterested }: ExportParticipantsButtonProps) => {
	const [open, setOpen] = useState<SelectedParticipant>({ modal: null })
	const handleOpenExportParticipantsModal = () => {
		setOpen({ modal: PARTICIPANT_MODAL_TYPE.EXPORT })
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
			<ExportParticipantsDataModal isInterested={isInterested} open={open} setOpen={setOpen} />
		</>
	)
})

ExportParticipantsButton.displayName = 'ExportParticipantsButton'
