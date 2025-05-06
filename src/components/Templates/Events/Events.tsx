'use client'
import { useState } from 'react'

import { ListManager } from '@/components/Molecules'
import {
	CreateEventButton,
	EventDeleteModal,
	ListPage,
	PageContent,
} from '@/components/Organisms'
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

	useTooltip(Boolean(selectedEvent))

	const handleEditEvent = (id: EventsFromAPI['id']) => {
		setSelectedEvent(id)
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
		<PageContent subheadingPage="Lista de eventos" isLoading={isLoading}>
			<ListPage
				placeholderField="Encontrar um evento"
				className="w-full lg:max-w-full"
				search={search}
				setSearch={setSearch}
				actionButton={
					<CreateEventButton
						drawerId={MODALS_IDS.EVENT_CREATE_OR_UPDATE_DRAWER}
						selectedEvent={selectedEvent}
						setSelectedEvent={setSelectedEvent}
					/>
				}
			>
				<ListManager
					bodyData={formatData}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
				/>
			</ListPage>
			<EventDeleteModal
				modalId={MODALS_IDS.EVENT_REMOVE_MODAL}
				selectedEvent={selectedEvent}
				setSelectedEvent={setSelectedEvent}
			/>
		</PageContent>
	)
}
