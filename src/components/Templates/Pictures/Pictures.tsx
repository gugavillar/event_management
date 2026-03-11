'use client'
import { Search } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Field, Pagination, Select } from '@/components/Atoms'
import { ComboBox, ListManager } from '@/components/Molecules'
import { ListPage, PageContent } from '@/components/Organisms'
import { formatterComboBoxValues, formatterFieldSelectValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetParticipants, useGetParticipantsCities } from '@/services/queries/participants'

import { formatTableData, HEADER_LABELS } from './Pictures.utils'

export const Pictures = () => {
	const [eventId, setEventId] = useState('')

	const { data: events, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetInfinityEvents()
	const {
		data: participants,
		isLoading,
		search,
		setSearch,
		page,
		setPage,
		query,
		setQuery,
	} = useGetParticipants(false, !!eventId)
	const { data: participantsCities } = useGetParticipantsCities({
		enabled: !!eventId,
		eventId,
	})

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id'
	)

	const lastItemRef = useInfiniteScrollObserver({
		fetchNextPage,
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
	})

	const formattedParticipants = formatTableData(participants?.data)

	const formattedCities = formatterFieldSelectValues(participantsCities, 'city', 'city')
	formattedCities.unshift({
		label: 'Todos as cidades',
		value: '',
	})

	const handleQueryChange = useCallback(
		(value: string, field: string) => {
			setQuery((prev) => ({
				...prev,
				[field]: value,
			}))
		},
		[setQuery]
	)

	useEffect(() => {
		if (!eventId) return
		handleQueryChange(eventId, 'eventId')
	}, [eventId, handleQueryChange])

	const hasMoreThanOnePage = !!participants?.totalPages && participants.totalPages > 1

	return (
		<PageContent pageTitle="Fotos" subheadingPage="Envio de fotos dos participantes do evento">
			<div className="flex flex-col items-center justify-center gap-5 md:flex-row">
				<ComboBox
					keyOptionLabel="label"
					keyOptionValue="value"
					lastItemRef={lastItemRef}
					options={formattedEvents}
					placeholder="Selecione um evento"
					selectedValue={eventId}
					setSelectedValue={setEventId}
				/>
				<div className="w-full">
					<Select
						disabled={!eventId}
						onChange={(e) => handleQueryChange(e.target.value, 'city')}
						options={formattedCities}
						value={query.city}
					/>
				</div>
				<Field
					className="ps-11"
					disabled={!eventId}
					onChange={(event) => setSearch?.(event.target.value)}
					placeholder="Encontrar um participante"
					rightIcon={<Search size={24} />}
					value={search}
				/>
			</div>
			<ListPage>
				<ListManager bodyData={formattedParticipants} headerLabels={HEADER_LABELS} isLoading={isLoading} />
				{hasMoreThanOnePage && (
					<Pagination currentPage={page} setPage={setPage} totalPages={participants?.totalPages} />
				)}
			</ListPage>
		</PageContent>
	)
}
