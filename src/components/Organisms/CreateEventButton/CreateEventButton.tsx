'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, memo, SetStateAction } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LuCalendarPlus } from 'react-icons/lu'

import { Button } from '@/components/Atoms'
import { overlayOpen } from '@/constants'
import { EventsAPI } from '@/services/queries/events/event.type'

import { EventDrawer } from '../EventDrawer'
import { EventSchema, EventSchemaType } from '../EventDrawer/EventDrawer.schema'

type CreateEventButtonProps = {
	drawerId: string
	selectedEvent: null | EventsAPI['id']
	setSelectedEvent: Dispatch<SetStateAction<EventsAPI['id'] | null>>
}

export const CreateEventButton = memo(
	({ drawerId, selectedEvent, setSelectedEvent }: CreateEventButtonProps) => {
		const methods = useForm<EventSchemaType>({
			defaultValues: {
				name: '',
				gender: '',
				initialDate: '',
				finalDate: '',
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
					type="button"
					onClick={handleCreateEvent}
					leftIcon={<LuCalendarPlus />}
					className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				>
					Criar um novo evento
				</Button>
				<FormProvider {...methods}>
					<EventDrawer
						drawerId={drawerId}
						selectedEvent={selectedEvent}
						setSelectedEvent={setSelectedEvent}
					/>
				</FormProvider>
			</>
		)
	},
)

CreateEventButton.displayName = 'CreateEventButton'
