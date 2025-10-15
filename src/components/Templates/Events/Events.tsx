'use client'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { Pagination } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import {
	CreateEventButton,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import {
	type MEMBERS,
	MembersTypes,
	MODALS_IDS,
	overlayOpen,
} from '@/constants'
import {
	useGetEvents,
	useUpdateInterested,
	useUpdateRegistration,
} from '@/services/queries/events'
import type { EventsAPI } from '@/services/queries/events/event.type'
import { generateToastError } from '@/utils/errors'
import { formatTableData, HEADER_LABELS } from './Events.utils'

const EventDeleteModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.EventDeleteModal)
)

export const Events = () => {
	const [selectedEvent, setSelectedEvent] = useState<null | EventsAPI['id']>(
		null
	)
	const { update: updateRegistration } = useUpdateRegistration()
	const { update: updateInterested } = useUpdateInterested()
	const {
		data: events,
		isLoading,
		search,
		setSearch,
		page,
		setPage,
	} = useGetEvents()

	const handleEditEvent = useCallback((id: EventsAPI['id']) => {
		setSelectedEvent(id)
		overlayOpen(MODALS_IDS.EVENT_CREATE_OR_UPDATE_DRAWER)
	}, [])

	const handleOpenModalToDeleteEvent = useCallback((id: EventsAPI['id']) => {
		setSelectedEvent(id)
		overlayOpen(MODALS_IDS.EVENT_REMOVE_MODAL)
	}, [])

	const handleOpenSelectedLink = useCallback(
		(id: EventsAPI['id'], type: 'participante' | 'voluntario') => {
			window.open(`${window.location.origin}/inscricao/${id}/${type}`)
		},
		[]
	)

	const handleOpenInterestedLink = useCallback((id: EventsAPI['id']) => {
		window.open(
			`${window.location.origin}/lista-interessados/${id}/participante`
		)
	}, [])

	const handleActivatedOrDeactivatedInterestedList = useCallback(
		(id: EventsAPI['id'], action: 'open' | 'close') => {
			updateInterested(
				{ action, eventId: id },
				{
					onError: (error) => {
						generateToastError(
							error,
							`Falha ao tentar ${action === 'open' ? 'abrir' : 'fechar'} lista de interessados`
						)
					},
					onSuccess: () => {
						toast.success(
							`Lista de interessados ${action === 'open' ? 'aberta' : 'fechada'} com sucesso!`
						)
					},
				}
			)
		},
		[updateInterested]
	)

	const handleBlockOrOpenRegistration = useCallback(
		async (
			id: EventsAPI['id'],
			memberType: MEMBERS,
			action: 'open' | 'close'
		) => {
			await updateRegistration(
				{ action, eventId: id, memberType },
				{
					onError: (error) =>
						generateToastError(
							error,
							'Falha ao tentar bloquear ou abrir inscrição'
						),
					onSuccess: () => {
						toast.success(
							`Inscrição de ${MembersTypes[memberType].label.toLowerCase()} ${action === 'open' ? 'aberta' : 'fechada'} com sucesso!`
						)
					},
				}
			)
		},
		[updateRegistration]
	)

	const formatData = formatTableData(
		events?.data,
		handleEditEvent,
		handleOpenModalToDeleteEvent,
		handleOpenSelectedLink,
		handleBlockOrOpenRegistration,
		handleActivatedOrDeactivatedInterestedList,
		handleOpenInterestedLink
	)

	const hasMoreThanOnePage = !!events?.totalPages && events.totalPages > 1

	return (
		<PageContent subheadingPage="Lista de eventos">
			<ListPage
				actionButton={
					<CreateEventButton
						drawerId={MODALS_IDS.EVENT_CREATE_OR_UPDATE_DRAWER}
						selectedEvent={selectedEvent}
						setSelectedEvent={setSelectedEvent}
					/>
				}
				className="w-full lg:max-w-full"
				placeholderField="Encontrar um evento"
				search={search}
				setSearch={setSearch}
			>
				<ListManager
					bodyData={formatData}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
				/>
				{hasMoreThanOnePage && (
					<Pagination
						currentPage={page}
						setPage={setPage}
						totalPages={events?.totalPages}
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
