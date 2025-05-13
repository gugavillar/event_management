'use client'
import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'

import { QUERY_KEYS } from '@/constants'

import { ParticipantsFromAPI } from '../participants.type'
import { getParticipants } from '../usecases'

export const useGetInfinityParticipants = (
	eventId = '',
	searchParticipant = '',
) => {
	const debounceParticipant = useDebounce(searchParticipant, 500)

	const query: UseInfiniteQueryResult<{
		pages: Array<ParticipantsFromAPI>
		pageParams: Array<number>
	}> = useInfiniteQuery({
		initialPageParam: 1,
		queryKey: [QUERY_KEYS.EVENTS, eventId, debounceParticipant],
		queryFn: async ({ pageParam }) =>
			await getParticipants({
				searchParticipant: debounceParticipant,
				eventId,
				statusParticipant: '',
				page: pageParam,
			}),
		getNextPageParam: (lastPage: ParticipantsFromAPI) => {
			const { currentPage, totalPages } = lastPage
			return currentPage < totalPages ? currentPage + 1 : undefined
		},
	})

	return query
}
