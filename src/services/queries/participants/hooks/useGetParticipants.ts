'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { ParticipantsFromAPI } from '../participants.type'
import { getParticipants } from '../usecases'

export const useGetParticipants = () => {
	const searchParams = useSearchParams()
	const [eventId, setEventId] = useState(searchParams.get('eventId') || '')
	const [search, setSearch] = useState(
		searchParams.get('searchParticipant') || '',
	)
	const [status, setStatus] = useState(
		searchParams.get('statusParticipant') || '',
	)
	const [city, setCity] = useState(searchParams.get('cityParticipant') || '')
	const [page, setPage] = useState(
		Number(searchParams.get('pageParticipant')) || 1,
	)

	const debounceEventId = useDebounce(eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debounceStatus = useDebounce(status, 500)
	const debounceCity = useDebounce(city, 500)

	useEffect(() => {
		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceEventId, debounceSearch, debounceStatus, debounceCity])

	useAddSearchParams({
		eventId: debounceEventId,
		searchParticipant: debounceSearch,
		statusParticipant: debounceStatus,
		cityParticipant: debounceCity,
		pageParticipant: page.toString(),
	})

	const query: UseQueryResult<ParticipantsFromAPI> = useQuery({
		queryKey: [
			QUERY_KEYS.PARTICIPANTS,
			debounceEventId,
			debounceSearch,
			debounceStatus,
			debounceCity,
			page,
		],
		queryFn: () =>
			getParticipants({
				eventId: debounceEventId,
				searchParticipant: debounceSearch,
				statusParticipant: debounceStatus,
				participantCity: debounceCity,
				page,
			}),
		retry: 0,
	})

	return {
		...query,
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
