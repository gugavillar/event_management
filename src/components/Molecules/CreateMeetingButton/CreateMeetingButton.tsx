'use client'

import { Speech } from 'lucide-react'
import dynamic from 'next/dynamic'
import { memo } from 'react'

import { Button } from '@/components/Atoms'
import { MODALS_IDS, overlayOpen } from '@/constants'

const MeetingCreateModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.MeetingCreateModal)
)

export const CreateMeetingButton = memo(() => {
	const handleOpenMeetingCreateModal = () => {
		overlayOpen(MODALS_IDS.MEETING_CREATE_MODAL)
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
			<MeetingCreateModal modalId={MODALS_IDS.MEETING_CREATE_MODAL} />
		</>
	)
})

CreateMeetingButton.displayName = 'CreateMeetingButton'
