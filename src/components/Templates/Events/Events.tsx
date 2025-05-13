'use client'
import { useState } from 'react'

import { Pagination } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import {
	CreateEventButton,
	EventDeleteModal,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { useGetEvents } from '@/services/queries/events'
import { EventsAPI } from '@/services/queries/events/event.type'

import { formatTableData, HEADER_LABELS } from './Events.utils'

export const Events = () => {
	const [selectedEvent, setSelectedEvent] = useState<null | EventsAPI['id']>(
		null,
	)

	const {
		data: events,
		isLoading,
		search,
		setSearch,
		page,
		setPage,
	} = useGetEvents()

	const handleEditEvent = (id: EventsAPI['id']) => {
		setSelectedEvent(id)
		overlayOpen(MODALS_IDS.EVENT_CREATE_OR_UPDATE_DRAWER)
	}

	const handleOpenModalToDeleteEvent = (id: EventsAPI['id']) => {
		setSelectedEvent(id)
		overlayOpen(MODALS_IDS.EVENT_REMOVE_MODAL)
	}

	const formatData = formatTableData(
		events?.data,
		handleEditEvent,
		handleOpenModalToDeleteEvent,
	)

	const hasMoreThanOnePage = !!events?.totalPages && events.totalPages > 1

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
				{hasMoreThanOnePage && (
					<Pagination
						currentPage={page}
						totalPages={events?.totalPages}
						setPage={setPage}
					/>
				)}
			</ListPage>
			<EventDeleteModal
				modalId={MODALS_IDS.EVENT_REMOVE_MODAL}
				selectedEvent={selectedEvent}
				setSelectedEvent={setSelectedEvent}
			/>
		</PageContent>
	)
}
