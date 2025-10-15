'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarPlus } from 'lucide-react'
import { type Dispatch, memo, type SetStateAction } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/Atoms'
import { overlayOpen } from '@/constants'
import type { EventsAPI } from '@/services/queries/events/event.type'

import { EventDrawer } from '../EventDrawer'
import { EventSchema, type EventSchemaType } from '../EventDrawer/EventDrawer.schema'

type CreateEventButtonProps = {
	drawerId: string
	selectedEvent: null | EventsAPI['id']
	setSelectedEvent: Dispatch<SetStateAction<EventsAPI['id'] | null>>
}

export const CreateEventButton = memo(({ drawerId, selectedEvent, setSelectedEvent }: CreateEventButtonProps) => {
	const methods = useForm<EventSchemaType>({
		defaultValues: {
			finalDate: '',
			gender: '',
			initialDate: '',
			maxAge: '',
			minAge: '',
			name: '',
			participantPrice: '',
			volunteerPrice: '',
		},
		mode: 'onChange',
		resolver: zodResolver(EventSchema),
	})

	const handleCreateEvent = () => {
		setSelectedEvent(null)
		overlayOpen(drawerId)
	}

	return (
		<>
			<Button
				className="items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 md:min-w-60"
				leftIcon={<CalendarPlus />}
				onClick={handleCreateEvent}
				type="button"
			>
				<span className="max-md:hidden">Criar evento</span>
			</Button>
			<FormProvider {...methods}>
				<EventDrawer drawerId={drawerId} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
			</FormProvider>
		</>
	)
})

CreateEventButton.displayName = 'CreateEventButton'
