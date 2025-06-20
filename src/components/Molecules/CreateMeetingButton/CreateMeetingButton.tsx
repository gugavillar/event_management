'use client'

import { Speech } from 'lucide-react'
import dynamic from 'next/dynamic'
import { memo } from 'react'

import { Button } from '@/components/Atoms'
import { MODALS_IDS } from '@/constants'

const MeetingCreateModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.MeetingCreateModal),
)

export const CreateMeetingButton = memo(() => {
	return (
		<>
			<Button
				type="button"
				leftIcon={<Speech />}
				data-hs-overlay={`#${MODALS_IDS.MEETING_CREATE_MODAL}`}
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			>
				Criar uma nova reunião
			</Button>
			<MeetingCreateModal modalId={MODALS_IDS.MEETING_CREATE_MODAL} />
		</>
	)
})

CreateMeetingButton.displayName = 'CreateMeetingButton'
