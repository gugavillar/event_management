'use client'
import type { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { parseAsInteger, parseAsString, useQueryState, useQueryStates } from 'nuqs'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import type { ParticipantsFromAPI } from '../participants.type'
import { getParticipants } from '../usecases'

export const useGetParticipants = (isInterested?: boolean) => {
	const [query, setQuery] = useQueryStates({
		city: parseAsString.withDefault(''),
		eventId: parseAsString.withDefault(''),
		status: parseAsString.withDefault(''),
	})
	const [search, setSearch] = useQueryState('searchParticipant', {
		defaultValue: '',
	})

	const [page, setPage] = useQueryState('pageParticipant', parseAsInteger.withDefault(1))

	const debounceEventId = useDebounce(query.eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debounceStatus = useDebounce(query.status, 500)
	const debounceCity = useDebounce(query.city, 500)

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
		queryFn: () =>
			getParticipants({
				eventId: debounceEventId,
				isInterested,
				page,
				participantCity: debounceCity,
				searchParticipant: debounceSearch,
				statusParticipant: debounceStatus,
			}),
		queryKey: [
			QUERY_KEYS.PARTICIPANTS,
			debounceEventId,
			debounceSearch,
			debounceStatus,
			debounceCity,
			isInterested,
			page,
		],
	})

	return {
		data,
		isLoading,
		page,
		query,
		search,
		setPage,
		setQuery,
		setSearch,
	}
}
