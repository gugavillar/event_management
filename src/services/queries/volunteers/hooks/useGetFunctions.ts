'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { getFunctions } from '../usecases'
import { VolunteersFunctionsFromAPI } from '../volunteers.type'

export const useGetFunctions = () => {
	const searchParams = useSearchParams()
	const [search, setSearch] = useState(searchParams.get('searchFunction') || '')

	const debounceSearch = useDebounce(search, 500)

	useAddSearchParams({
		searchFunction: debounceSearch,
	})

	const query: UseQueryResult<Array<VolunteersFunctionsFromAPI>> = useQuery({
		queryKey: [QUERY_KEYS.VOLUNTEERS_FUNCTIONS, debounceSearch],
		queryFn: () =>
			getFunctions({
				searchFunction: debounceSearch,
			}),
		retry: 0,
	})

	return { ...query, setSearch, search }
}
