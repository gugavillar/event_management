'use client'
import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'

import { EventsFromAPI } from '../event.type'
import { getEvents } from '../usecases'

export const useGetInfinityEvents = () => {
	const [search, setSearch] = useState('')
	const debouceValue = useDebounce(search, 500)

	const query: UseInfiniteQueryResult<{
		pages: Array<EventsFromAPI>
		pageParams: Array<number>
	}> = useInfiniteQuery({
		initialPageParam: 1,
		queryKey: [QUERY_KEYS.EVENTS_INFINITY, debouceValue],
		queryFn: async ({ pageParam }) =>
			await getEvents({ searchEvent: debouceValue, page: pageParam }),
		getNextPageParam: (lastPage: EventsFromAPI) => {
			const { currentPage, totalPages } = lastPage
			return currentPage < totalPages ? currentPage + 1 : undefined
		},
	})

	return {
		data: query.data,
		hasNextPage: query.hasNextPage,
		isFetchingNextPage: query.isFetchingNextPage,
		fetchNextPage: query.fetchNextPage,
		search,
		setSearch,
	}
}
