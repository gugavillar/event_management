'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { ParticipantsFromAPI } from '../participants.type'
import { getParticipants } from '../usecases'

export const useGetParticipants = (isInterested?: boolean) => {
	const [eventId, setEventId] = useQueryState('eventId', {
		defaultValue: '',
	})
	const [search, setSearch] = useQueryState('searchParticipant', {
		defaultValue: '',
	})
	const [status, setStatus] = useQueryState('statusParticipant', {
		defaultValue: '',
	})
	const [city, setCity] = useQueryState('cityParticipant', {
		defaultValue: '',
	})
	const [page, setPage] = useQueryState(
		'pageParticipant',
		parseAsInteger.withDefault(1),
	)

	const debounceEventId = useDebounce(eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debounceStatus = useDebounce(status, 500)
	const debounceCity = useDebounce(city, 500)

	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceEventId, debounceSearch, debounceStatus, debounceCity])

	const { data, isLoading }: UseQueryResult<ParticipantsFromAPI> = useQuery({
		queryKey: [
			QUERY_KEYS.PARTICIPANTS,
			debounceEventId,
			debounceSearch,
			debounceStatus,
			debounceCity,
			isInterested,
			page,
		],
		queryFn: () =>
			getParticipants({
				eventId: debounceEventId,
				searchParticipant: debounceSearch,
				statusParticipant: debounceStatus,
				participantCity: debounceCity,
				isInterested,
				page,
			}),
	})

	return {
		data,
		isLoading,
		eventId,
		setEventId,
		setSearch,
		search,
		status,
		setStatus,
		page,
		setPage,
		city,
		setCity,
	}
}
