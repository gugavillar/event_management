'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getVolunteers } from '../usecases'
import { VolunteersFromAPI } from '../volunteers.type'

export const useGetVolunteers = () => {
	const [eventId, setEventId] = useQueryState('eventId', { defaultValue: '' })
	const [search, setSearch] = useQueryState('searchVolunteer', {
		defaultValue: '',
	})
	const [status, setStatus] = useQueryState('statusVolunteer', {
		defaultValue: '',
	})
	const [city, setCity] = useQueryState('cityVolunteer', { defaultValue: '' })
	const [role, setRole] = useQueryState('roleVolunteer', { defaultValue: '' })
	const [page, setPage] = useQueryState(
		'pageVolunteer',
		parseAsInteger.withDefault(1),
	)

	const debounceEventId = useDebounce(eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debounceStatus = useDebounce(status, 500)
	const debounceRole = useDebounce(role, 500)
	const debounceCity = useDebounce(city, 500)

	useEffect(() => {
		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		debounceEventId,
		debounceSearch,
		debounceStatus,
		debounceRole,
		debounceCity,
	])

	useEffect(() => {
		if (!eventId) setRole('')
	}, [eventId, setRole])

	const query: UseQueryResult<VolunteersFromAPI> = useQuery({
		queryKey: [
			QUERY_KEYS.VOLUNTEERS,
			debounceEventId,
			debounceSearch,
			debounceStatus,
			debounceRole,
			debounceCity,
			page,
		],
		queryFn: () =>
			getVolunteers({
				eventId: debounceEventId,
				searchVolunteer: debounceSearch,
				statusVolunteer: debounceStatus,
				roleVolunteer: debounceRole,
				volunteerCity: debounceCity,
				page,
			}),
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
		city,
		setCity,
	}
}
