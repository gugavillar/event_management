'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LuCalendarPlus } from 'react-icons/lu'

import { Button } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import {
	EventDeleteModal,
	EventDrawer,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import {
	EventSchema,
	EventSchemaType,
} from '@/components/Organisms/EventDrawer/EventDrawer.schema'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { useTooltip } from '@/hooks'
import { useGetEvents } from '@/services/queries/events'
import { EventsFromAPI } from '@/services/queries/events/event.type'

import { formatTableData, HEADER_LABELS } from './Events.utils'

export const Events = () => {
	const [selectedEvent, setSelectedEvent] = useState<
		null | EventsFromAPI['id']
	>(null)

	const { data, isLoading, search, setSearch } = useGetEvents()

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
	useTooltip(Boolean(selectedEvent))

	const handleEditEvent = (id: EventsFromAPI['id']) => {
		setSelectedEvent(id)
		overlayOpen(MODALS_IDS.EVENT_CREATE_OR_UPDATE_DRAWER)
	}

	const handleCreateEvent = () => {
		setSelectedEvent(null)
		overlayOpen(MODALS_IDS.EVENT_CREATE_OR_UPDATE_DRAWER)
	}

	const handleOpenModalToDeleteEvent = async (id: EventsFromAPI['id']) => {
		setSelectedEvent(id)
		overlayOpen(MODALS_IDS.EVENT_REMOVE_MODAL)
	}

	const formatData = formatTableData(
		data,
		handleEditEvent,
		handleOpenModalToDeleteEvent,
	)

	return (
		<PageContent subheadingPage="Listagem de eventos" isLoading={isLoading}>
			<ListPage
				placeholderField="Encontrar um evento"
				className="w-full lg:max-w-full"
				search={search}
				setSearch={setSearch}
				actionButton={
					<Button
						type="button"
						onClick={handleCreateEvent}
						leftIcon={<LuCalendarPlus />}
						className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					>
						Criar um novo evento
					</Button>
				}
			>
				<ListManager
					bodyData={formatData}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
				/>
			</ListPage>
			<FormProvider {...methods}>
				<EventDrawer
					drawerId={MODALS_IDS.EVENT_CREATE_OR_UPDATE_DRAWER}
					selectedEvent={selectedEvent}
					setSelectedEvent={setSelectedEvent}
				/>
			</FormProvider>
			<EventDeleteModal
				modalId={MODALS_IDS.EVENT_REMOVE_MODAL}
				selectedEvent={selectedEvent}
				setSelectedEvent={setSelectedEvent}
			/>
		</PageContent>
	)
}
