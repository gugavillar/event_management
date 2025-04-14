'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { EventsFromAPI } from '../event.type'
import { getEvents } from '../usecases'

export const useGetEvents = () => {
	const searchParams = useSearchParams()
	const [search, setSearch] = useState(searchParams.get('search') || '')

	const debouceValue = useDebounce(search, 500)

	useEffect(() => {
		if (!debouceValue) {
			return window.history.replaceState({}, '', window.location.pathname)
		}

		const params = new URLSearchParams(window.location.search)
		params.set('search', debouceValue)

		const newUrl = `${window.location.pathname}?${params.toString()}`

		window.history.replaceState({}, '', newUrl)
	}, [debouceValue, searchParams])

	const query: UseQueryResult<{ data: Array<EventsFromAPI> }> = useQuery({
		queryKey: [QUERY_KEYS.EVENTS, debouceValue],
		queryFn: () => getEvents({ search: debouceValue }),
		retry: 0,
	})

	return { ...query, search, setSearch }
}
