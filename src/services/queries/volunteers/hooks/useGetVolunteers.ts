'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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
	const [role, setRole] = useState(searchParams.get('roleVolunteer') || '')
	const [page, setPage] = useState(
		Number(searchParams.get('pageVolunteer')) || 1,
	)

	const debounceEventId = useDebounce(eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debounceStatus = useDebounce(status, 500)
	const debounceRole = useDebounce(role, 500)

	useEffect(() => {
		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceEventId, debounceSearch, debounceStatus, debounceRole])

	useAddSearchParams({
		eventId: debounceEventId,
		searchParticipant: debounceSearch,
		statusParticipant: debounceStatus,
		roleVolunteer: debounceRole,
		pageVolunteer: page.toString(),
	})

	const query: UseQueryResult<VolunteersFromAPI> = useQuery({
		queryKey: [
			QUERY_KEYS.VOLUNTEERS,
			debounceEventId,
			debounceSearch,
			debounceStatus,
			debounceRole,
			page,
		],
		queryFn: () =>
			getVolunteers({
				eventId: debounceEventId,
				searchVolunteer: debounceSearch,
				statusVolunteer: debounceStatus,
				roleVolunteer: debounceRole,
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
		role,
		setRole,
		page,
		setPage,
	}
}
