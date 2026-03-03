'use client'

import { Speech } from 'lucide-react'
import dynamic from 'next/dynamic'
import { memo, useState } from 'react'

import { Button } from '@/components/Atoms'
import { MEETING_MODAL_TYPE } from '@/constants'

const MeetingCreateModal = dynamic(() => import('@/components/Organisms').then((mod) => mod.MeetingCreateModal))

export type SelectedMeeting = {
	modal: MEETING_MODAL_TYPE | null
}

export const CreateMeetingButton = memo(() => {
	const [open, setOpen] = useState<SelectedMeeting>({ modal: null })

	const handleOpenMeetingCreateModal = () => {
		setOpen({ modal: MEETING_MODAL_TYPE.CREATE })
	}

	return (
		<>
			<Button
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				leftIcon={<Speech />}
				onClick={handleOpenMeetingCreateModal}
				type="button"
			>
				Criar uma nova reunião
			</Button>
			<MeetingCreateModal open={open} setOpen={setOpen} />
		</>
	)
})

CreateMeetingButton.displayName = 'CreateMeetingButton'
