'use client'
import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'

import { CHECK_IN_STATUS, LIMIT_PER_PAGE, QUERY_KEYS } from '@/constants'

import { getVolunteers } from '../usecases'
import { VolunteersFromAPI } from '../volunteers.type'

export type UseGetInfinityVolunteersArgs = {
	eventId: string
	hasNoGroup?: boolean
	hasNoRoom?: boolean
	statusVolunteer?: CHECK_IN_STATUS
	limit?: number
}

export const useGetInfinityVolunteers = ({
	eventId,
	hasNoGroup,
	hasNoRoom,
	statusVolunteer,
	limit = LIMIT_PER_PAGE,
}: UseGetInfinityVolunteersArgs) => {
	const [searchVolunteer, setSearchVolunteer] = useState('')
	const debounceVolunteer = useDebounce(searchVolunteer, 500)

	const query: UseInfiniteQueryResult<{
		pages: Array<VolunteersFromAPI>
		pageParams: Array<number>
	}> = useInfiniteQuery({
		initialPageParam: 1,
		queryKey: [
			QUERY_KEYS.VOLUNTEERS_INFINITY,
			eventId,
			debounceVolunteer,
			hasNoGroup,
			hasNoRoom,
			statusVolunteer,
			limit,
		],
		queryFn: async ({ pageParam }) =>
			await getVolunteers({
				searchVolunteer: debounceVolunteer,
				eventId,
				...(statusVolunteer && { statusVolunteer }),
				...(hasNoGroup && { hasNoGroup }),
				...(hasNoRoom && { hasNoRoom }),
				page: pageParam,
				limit,
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
