'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getFunctions } from '../usecases'
import { VolunteersFunctionsFromAPI } from '../volunteers.type'

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

	const query: UseQueryResult<Array<VolunteersFunctionsFromAPI>> = useQuery({
		queryKey: [QUERY_KEYS.VOLUNTEERS_FUNCTIONS, debounceSearch, eventId],
		queryFn: () =>
			getFunctions({
				eventId,
				searchFunction: debounceSearch,
			}),
		enabled: !!eventId,
	})

	return { ...query, setSearch, search, eventId, setEventId }
}
