'use client'
import {
	type UseInfiniteQueryResult,
	useInfiniteQuery,
} from '@tanstack/react-query'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useDebounce } from '@uidotdev/usehooks'
import type { EventsFromAPI } from '../event.type'
import { getEvents } from '../usecases'

export const useGetInfinityEvents = () => {
	const [search, setSearch] = useState('')
	const debouceValue = useDebounce(search, 500)

	const {
		data,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	}: UseInfiniteQueryResult<{
		pages: Array<EventsFromAPI>
		pageParams: Array<number>
	}> = useInfiniteQuery({
		getNextPageParam: (lastPage: EventsFromAPI) => {
			const { currentPage, totalPages } = lastPage
			return currentPage < totalPages ? currentPage + 1 : undefined
		},
		initialPageParam: 1,
		queryFn: async ({ pageParam }) =>
			await getEvents({ page: pageParam, searchEvent: debouceValue }),
		queryKey: [QUERY_KEYS.EVENTS_INFINITY, debouceValue],
	})

	return {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		search,
		setSearch,
	}
}
