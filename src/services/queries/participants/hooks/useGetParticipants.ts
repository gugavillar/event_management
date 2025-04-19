'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

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

	const debounceEventId = useDebounce(eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debounceStatus = useDebounce(status, 500)

	useAddSearchParams({
		eventId: debounceEventId,
		searchParticipant: debounceSearch,
		statusParticipant: debounceStatus,
	})

	const query: UseQueryResult<Array<ParticipantsFromAPI>> = useQuery({
		queryKey: [
			QUERY_KEYS.PARTICIPANTS,
			debounceEventId,
			debounceSearch,
			debounceStatus,
		],
		queryFn: () =>
			getParticipants({
				eventId: debounceEventId,
				searchParticipant: debounceSearch,
				statusParticipant: debounceStatus,
			}),
		retry: 0,
	})

	return { ...query, eventId, setEventId, setSearch, search, status, setStatus }
}
