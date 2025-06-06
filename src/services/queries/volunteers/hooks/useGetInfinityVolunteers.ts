'use client'
import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'

import { getVolunteers } from '../usecases'
import { VolunteersFromAPI } from '../volunteers.type'

export const useGetInfinityVolunteers = (eventId = '') => {
	const [searchVolunteer, setSearchVolunteer] = useState('')
	const debounceVolunteer = useDebounce(searchVolunteer, 500)

	const query: UseInfiniteQueryResult<{
		pages: Array<VolunteersFromAPI>
		pageParams: Array<number>
	}> = useInfiniteQuery({
		initialPageParam: 1,
		queryKey: [QUERY_KEYS.VOLUNTEERS_INFINITY, eventId, debounceVolunteer],
		queryFn: async ({ pageParam }) =>
			await getVolunteers({
				searchVolunteer: debounceVolunteer,
				eventId,
				statusVolunteer: '',
				page: pageParam,
			}),
		getNextPageParam: (lastPage: VolunteersFromAPI) => {
			const { currentPage, totalPages } = lastPage
			return currentPage < totalPages ? currentPage + 1 : undefined
		},
		enabled: !!eventId,
	})

	return {
		data: query.data,
		hasNextPage: query.hasNextPage,
		isFetchingNextPage: query.isFetchingNextPage,
		fetchNextPage: query.fetchNextPage,
		searchVolunteer,
		setSearchVolunteer,
	}
}
