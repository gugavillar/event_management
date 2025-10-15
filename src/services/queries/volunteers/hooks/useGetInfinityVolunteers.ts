'use client'
import { type UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'

import { type CHECK_IN_STATUS, LIMIT_PER_PAGE, QUERY_KEYS } from '@/constants'

import { getVolunteers } from '../usecases'
import type { VolunteersFromAPI } from '../volunteers.type'

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

	const {
		data,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	}: UseInfiniteQueryResult<{
		pages: Array<VolunteersFromAPI>
		pageParams: Array<number>
	}> = useInfiniteQuery({
		enabled: !!eventId,
		getNextPageParam: (lastPage: VolunteersFromAPI) => {
			const { currentPage, totalPages } = lastPage
			return currentPage < totalPages ? currentPage + 1 : undefined
		},
		initialPageParam: 1,
		queryFn: async ({ pageParam }) =>
			await getVolunteers({
				eventId,
				searchVolunteer: debounceVolunteer,
				...(statusVolunteer && { statusVolunteer }),
				...(hasNoGroup && { hasNoGroup }),
				...(hasNoRoom && { hasNoRoom }),
				limit,
				page: pageParam,
			}),
		queryKey: [
			QUERY_KEYS.VOLUNTEERS_INFINITY,
			eventId,
			debounceVolunteer,
			hasNoGroup,
			hasNoRoom,
			statusVolunteer,
			limit,
		],
	})

	return {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		searchVolunteer,
		setSearchVolunteer,
	}
}
