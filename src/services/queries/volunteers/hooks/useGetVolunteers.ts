'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import {
	parseAsInteger,
	parseAsString,
	useQueryState,
	useQueryStates,
} from 'nuqs'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getVolunteers } from '../usecases'
import { VolunteersFromAPI } from '../volunteers.type'

export const useGetVolunteers = () => {
	const [query, setQuery] = useQueryStates({
		eventId: parseAsString.withDefault(''),
		status: parseAsString.withDefault(''),
		city: parseAsString.withDefault(''),
		role: parseAsString.withDefault(''),
	})
	const [search, setSearch] = useQueryState('searchVolunteer', {
		defaultValue: '',
	})
	const [page, setPage] = useQueryState(
		'pageVolunteer',
		parseAsInteger.withDefault(1),
	)

	const debounceEventId = useDebounce(query.eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debounceStatus = useDebounce(query.status, 500)
	const debounceRole = useDebounce(query.role, 500)
	const debounceCity = useDebounce(query.city, 500)
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		debounceEventId,
		debounceSearch,
		debounceStatus,
		debounceRole,
		debounceCity,
	])

	const { data, isLoading }: UseQueryResult<VolunteersFromAPI> = useQuery({
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
		data,
		isLoading,
		setSearch,
		search,
		page,
		setPage,
		query,
		setQuery,
	}
}
