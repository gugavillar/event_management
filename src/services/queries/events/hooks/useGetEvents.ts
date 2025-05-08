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
	const [search, setSearch] = useState(searchParams.get('searchEvent') || '')
	const [page, setPage] = useState(Number(searchParams.get('pageEvent')) || 1)

	const debouceValue = useDebounce(search, 500)

	useAddSearchParams({
		searchEvent: debouceValue,
		pageEvent: page.toString(),
	})

	const query: UseQueryResult<EventsFromAPI> = useQuery({
		queryKey: [QUERY_KEYS.EVENTS, debouceValue, page],
		queryFn: () => getEvents({ searchEvent: debouceValue, page }),
		retry: 0,
	})

	return { ...query, search, setSearch, page, setPage }
}
