'use client'
import { FileDown } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/components/Atoms'
import { MODALS_IDS } from '@/constants'

import { ExportMeetingDataModal } from '../ExportMeetingDataModal'

export const ExportMeetingButton = memo(() => {
	return (
		<>
			<Button
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				leftIcon={<FileDown />}
				data-hs-overlay={`#${MODALS_IDS.MEETING_EXPORT_MODAL}`}
			>
				Export reuniões
			</Button>
			<ExportMeetingDataModal modalId={MODALS_IDS.MEETING_EXPORT_MODAL} />
		</>
	)
})

ExportMeetingButton.displayName = 'ExportMeetingButton'
