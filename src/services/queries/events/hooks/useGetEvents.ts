'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { EventsFromAPI } from '../event.type'
import { getEvents } from '../usecases'

export const useGetEvents = () => {
	const searchParams = useSearchParams()
	const [search, setSearch] = useState(searchParams.get('search') || '')

	const debouceValue = useDebounce(search, 500)

	useAddSearchParams({
		search: debouceValue,
	})

	const query: UseQueryResult<Array<EventsFromAPI>> = useQuery({
		queryKey: [QUERY_KEYS.EVENTS, debouceValue],
		queryFn: () => getEvents({ search: debouceValue }),
		retry: 0,
	})

	return { ...query, search, setSearch }
}
