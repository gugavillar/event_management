'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { ParticipantsFromAPI } from '../participants.type'
import { getParticipants } from '../usecases'

export const useGetParticipants = () => {
	const searchParams = useSearchParams()
	const [eventId, setEventId] = useState(searchParams.get('eventId') || '')
	const [search, setSearch] = useState(searchParams.get('search') || '')

	const debounceEventId = useDebounce(eventId, 500)
	const debounceSearch = useDebounce(search, 500)

	useEffect(() => {
		if (!debounceEventId) {
			return window.history.replaceState({}, '', window.location.pathname)
		}

		const params = new URLSearchParams(window.location.search)
		params.set('eventId', debounceEventId)

		const newUrl = `${window.location.pathname}?${params.toString()}`

		window.history.replaceState({}, '', newUrl)
	}, [debounceEventId, searchParams])

	useEffect(() => {
		if (!debounceSearch) {
			return window.history.replaceState({}, '', window.location.pathname)
		}

		const params = new URLSearchParams(window.location.search)
		params.set('search', debounceSearch)

		const newUrl = `${window.location.pathname}?${params.toString()}`

		window.history.replaceState({}, '', newUrl)
	}, [debounceSearch, searchParams])

	const query: UseQueryResult<Array<ParticipantsFromAPI>> = useQuery({
		queryKey: [QUERY_KEYS.PARTICIPANTS, debounceEventId, debounceSearch],
		queryFn: () =>
			getParticipants({ eventId: debounceEventId, search: debounceSearch }),
		retry: 0,
	})

	return { ...query, eventId, setEventId, setSearch, search }
}
