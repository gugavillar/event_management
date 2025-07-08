'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

import { Pagination, Select } from '@/components/Atoms'
import { ComboBox, ListManager } from '@/components/Molecules'
import {
	InterestedModalToParticipant,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen } from '@/constants'
import {
	formatterComboBoxValues,
	formatterFieldSelectValues,
} from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import {
	useGetParticipants,
	useGetParticipantsCities,
} from '@/services/queries/participants'
import { ParticipantsAPI } from '@/services/queries/participants/participants.type'

import { formatTableData, HEADER_LABELS } from './InterestedParticipants.utils'

const ParticipantModalData = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.ParticipantModalData),
)

export const InterestedParticipants = () => {
	const [selectedParticipant, setSelectedParticipant] = useState<
		null | ParticipantsAPI['id']
	>(null)

	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const { data: participantsCities } = useGetParticipantsCities(true)
	const {
		data: participants,
		isLoading,
		search,
		setSearch,
		setEventId,
		eventId,
		page,
		setPage,
		city,
		setCity,
	} = useGetParticipants(true)

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
		true,
		'Todos os eventos',
	)

	const formattedCities = formatterFieldSelectValues(
		participantsCities,
		'city',
		'city',
	)
	formattedCities.unshift({
		label: 'Todos as cidades',
		value: '',
	})

	const lastItemRef = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
	})

	const handleOpenModalToShowParticipantData = useCallback(
		(id: ParticipantsAPI['id']) => {
			setSelectedParticipant(id)
			overlayOpen(MODALS_IDS.PARTICIPANT_MODAL_DATA)
		},
		[],
	)

	const handleOpenModalInterestedParticipant = useCallback(
		(id: ParticipantsAPI['id']) => {
			setSelectedParticipant(id)
			overlayOpen(MODALS_IDS.PARTICIPANT_INTERESTED_MODAL)
		},
		[],
	)

	const formattedInterestedParticipants = formatTableData(
		participants?.data,
		handleOpenModalToShowParticipantData,
		handleOpenModalInterestedParticipant,
	)

	const hasMoreThanOnePage =
		!!participants?.totalPages && participants.totalPages > 1

	return (
		<PageContent
			subheadingPage="Lista de participantes interessados"
			pageTitle="Participantes interessados"
		>
			<ListPage
				placeholderField="Encontrar um participante"
				className="lg:max-w-full"
				search={search}
				setSearch={setSearch}
				moreFilter={
					<>
						<ComboBox
							keyOptionLabel="label"
							keyOptionValue="value"
							options={formattedEvents}
							selectedValue={eventId}
							setSelectedValue={setEventId}
							lastItemRef={lastItemRef}
						/>
						<Select
							options={formattedCities}
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</>
				}
			>
				<ListManager
					bodyData={formattedInterestedParticipants}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
				/>
				{hasMoreThanOnePage && (
					<Pagination
						currentPage={page}
						totalPages={participants?.totalPages}
						setPage={setPage}
					/>
				)}
			</ListPage>
			<ParticipantModalData
				modalId={MODALS_IDS.PARTICIPANT_MODAL_DATA}
				selectedParticipant={selectedParticipant}
				setSelectedParticipant={setSelectedParticipant}
			/>
			<InterestedModalToParticipant
				modalId={MODALS_IDS.PARTICIPANT_INTERESTED_MODAL}
				selectedParticipant={selectedParticipant}
				setSelectedParticipant={setSelectedParticipant}
			/>
		</PageContent>
	)
}
