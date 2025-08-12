'use client'
import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'

import { CHECK_IN_STATUS, LIMIT_PER_PAGE, QUERY_KEYS } from '@/constants'

import { ParticipantsFromAPI } from '../participants.type'
import { getParticipants } from '../usecases'

export type UseGetInfinityParticipantsArgs = {
	eventId: string
	hasNoGroup?: boolean
	hasNoRoom?: boolean
	statusParticipant?: CHECK_IN_STATUS
	limit?: number
}

export const useGetInfinityParticipants = ({
	eventId,
	hasNoGroup,
	hasNoRoom,
	statusParticipant,
	limit = LIMIT_PER_PAGE,
}: UseGetInfinityParticipantsArgs) => {
	const [searchParticipant, setSearchParticipant] = useState('')
	const debounceParticipant = useDebounce(searchParticipant, 500)

	const {
		data,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	}: UseInfiniteQueryResult<{
		pages: Array<ParticipantsFromAPI>
		pageParams: Array<number>
	}> = useInfiniteQuery({
		initialPageParam: 1,
		queryKey: [
			QUERY_KEYS.PARTICIPANTS_INFINITY,
			eventId,
			debounceParticipant,
			hasNoGroup,
			hasNoRoom,
			statusParticipant,
			limit,
		],
		queryFn: async ({ pageParam }) =>
			await getParticipants({
				searchParticipant: debounceParticipant,
				eventId,
				...(statusParticipant && { statusParticipant }),
				...(hasNoGroup && { hasNoGroup }),
				...(hasNoRoom && { hasNoRoom }),
				page: pageParam,
				limitPerPage: limit,
			}),
		getNextPageParam: (lastPage: ParticipantsFromAPI) => {
			const { currentPage, totalPages } = lastPage
			return currentPage < totalPages ? currentPage + 1 : undefined
		},
		enabled: !!eventId,
	})

	return {
		data,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		searchParticipant,
		setSearchParticipant,
	}
}
