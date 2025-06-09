'use client'
import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'

import { ParticipantsFromAPI } from '../participants.type'
import { getParticipants } from '../usecases'

type UseGetInfinityParticipantsArgs = {
	eventId: string
	hasNoGroup?: boolean
	hasNoRoom?: boolean
}

export const useGetInfinityParticipants = ({
	eventId,
	hasNoGroup,
	hasNoRoom,
}: UseGetInfinityParticipantsArgs) => {
	const [searchParticipant, setSearchParticipant] = useState('')
	const debounceParticipant = useDebounce(searchParticipant, 500)

	const query: UseInfiniteQueryResult<{
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
		],
		queryFn: async ({ pageParam }) =>
			await getParticipants({
				searchParticipant: debounceParticipant,
				eventId,
				statusParticipant: '',
				...(hasNoGroup && { hasNoGroup }),
				...(hasNoRoom && { hasNoRoom }),
				page: pageParam,
			}),
		getNextPageParam: (lastPage: ParticipantsFromAPI) => {
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
		searchParticipant,
		setSearchParticipant,
	}
}
