'use client'
import { FileDown } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/components/Atoms'
import { MODALS_IDS } from '@/constants'

import { ExportParticipantsDataModal } from '../ExportParticipantsDataModal'

type ExportParticipantsButtonProps = {
	isInterested?: boolean
}

export const ExportParticipantsButton = memo(
	({ isInterested }: ExportParticipantsButtonProps) => {
		return (
			<>
				<Button
					className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					leftIcon={<FileDown />}
					data-hs-overlay={`#${MODALS_IDS.PARTICIPANT_EXPORT_MODAL}`}
				>
					{isInterested ? 'Export interessados' : 'Export participantes'}
				</Button>
				<ExportParticipantsDataModal
					modalId={MODALS_IDS.PARTICIPANT_EXPORT_MODAL}
					isInterested={isInterested}
				/>
			</>
		)
	},
)

ExportParticipantsButton.displayName = 'ExportParticipantsButton'
