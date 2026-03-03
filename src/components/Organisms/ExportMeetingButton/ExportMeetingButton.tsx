'use client'
import { FileDown } from 'lucide-react'
import { memo, useState } from 'react'

import { Button } from '@/components/Atoms'
import { MEETING_MODAL_TYPE } from '@/constants'

import { ExportMeetingDataModal } from '../ExportMeetingDataModal'

export type SelectedMeeting = {
	modal: MEETING_MODAL_TYPE | null
}

export const ExportMeetingButton = memo(() => {
	const [open, setOpen] = useState<SelectedMeeting>({ modal: null })
	const handleOpenExportMeetingModal = () => {
		setOpen({ modal: MEETING_MODAL_TYPE.EXPORT })
	}

	return (
		<>
			<Button
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				leftIcon={<FileDown />}
				onClick={handleOpenExportMeetingModal}
			>
				Export reuniões
			</Button>
			<ExportMeetingDataModal open={open} setOpen={setOpen} />
		</>
	)
})

ExportMeetingButton.displayName = 'ExportMeetingButton'
