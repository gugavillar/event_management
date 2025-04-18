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
	const [search, setSearch] = useState(searchParams.get('search') || '')

	const debounceEventId = useDebounce(eventId, 500)
	const debounceSearch = useDebounce(search, 500)

	useAddSearchParams({
		eventId: debounceEventId,
		search: debounceSearch,
	})

	const query: UseQueryResult<Array<ParticipantsFromAPI>> = useQuery({
		queryKey: [QUERY_KEYS.PARTICIPANTS, debounceEventId, debounceSearch],
		queryFn: () =>
			getParticipants({ eventId: debounceEventId, search: debounceSearch }),
		retry: 0,
	})

	return { ...query, eventId, setEventId, setSearch, search }
}
