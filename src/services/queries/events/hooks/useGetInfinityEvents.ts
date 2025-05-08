import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'

import { EventsFromAPI } from '../event.type'
import { getEvents } from '../usecases'

export const useGetInfinityEvents = () => {
	const query: UseInfiniteQueryResult<{
		pages: Array<EventsFromAPI>
		pageParams: Array<number>
	}> = useInfiniteQuery({
		initialPageParam: 1,
		queryKey: [QUERY_KEYS.EVENTS],
		queryFn: async ({ pageParam }) =>
			await getEvents({ searchEvent: '', page: pageParam }),
		getNextPageParam: (lastPage: EventsFromAPI) => {
			const { currentPage, totalPages } = lastPage
			return currentPage < totalPages ? currentPage + 1 : undefined
		},
	})

	return query
}
