'use client'
import type { UseQueryResult } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'
import { useDebounce } from '@uidotdev/usehooks'
import { getFunctions } from '../usecases'
import type { VolunteersFunctionsFromAPI } from '../volunteers.type'

export const useGetFunctions = (externalEventId = '') => {
	const searchParams = useSearchParams()
	const selectedEvent = searchParams.get('eventId') || externalEventId
	const [search, setSearch] = useState(searchParams.get('searchFunction') || '')
	const [eventId, setEventId] = useState(selectedEvent || '')

	const debounceSearch = useDebounce(search, 500)

	useEffect(() => {
		if (!selectedEvent) return setEventId('')
		setEventId(selectedEvent)
	}, [selectedEvent])

	const { data, isLoading }: UseQueryResult<Array<VolunteersFunctionsFromAPI>> =
		useQuery({
			enabled: !!eventId,
			queryFn: () =>
				getFunctions({
					eventId,
					searchFunction: debounceSearch,
				}),
			queryKey: [QUERY_KEYS.VOLUNTEERS_FUNCTIONS, debounceSearch, eventId],
		})

	return { data, eventId, isLoading, search, setEventId, setSearch }
}
