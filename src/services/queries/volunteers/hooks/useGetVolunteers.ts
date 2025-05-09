'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { getVolunteers } from '../usecases'
import { VolunteersFromAPI } from '../volunteers.type'

export const useGetVolunteers = () => {
	const searchParams = useSearchParams()
	const [eventId, setEventId] = useState(searchParams.get('eventId') || '')
	const [search, setSearch] = useState(
		searchParams.get('searchVolunteer') || '',
	)
	const [status, setStatus] = useState(
		searchParams.get('statusVolunteer') || '',
	)
	const [page, setPage] = useState(
		Number(searchParams.get('pageVolunteer')) || 1,
	)

	const debounceEventId = useDebounce(eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debounceStatus = useDebounce(status, 500)

	useAddSearchParams({
		eventId: debounceEventId,
		searchParticipant: debounceSearch,
		statusParticipant: debounceStatus,
		pageVolunteer: page.toString(),
	})

	const query: UseQueryResult<VolunteersFromAPI> = useQuery({
		queryKey: [
			QUERY_KEYS.VOLUNTEERS,
			debounceEventId,
			debounceSearch,
			debounceStatus,
			page,
		],
		queryFn: () =>
			getVolunteers({
				eventId: debounceEventId,
				searchVolunteer: debounceSearch,
				statusVolunteer: debounceStatus,
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
	}
}
