'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useQueryState, parseAsInteger } from 'nuqs'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { EventsFromAPI } from '../event.type'
import { getEvents } from '../usecases'

export const useGetEvents = () => {
	const [search, setSearch] = useQueryState('searchEvent', {
		defaultValue: '',
	})
	const [page, setPage] = useQueryState(
		'pageEvent',
		parseAsInteger.withDefault(1),
	)

	const debouceValue = useDebounce(search, 500)
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouceValue])

	const { data, isLoading }: UseQueryResult<EventsFromAPI> = useQuery({
		queryKey: [QUERY_KEYS.EVENTS, debouceValue, page],
		queryFn: () => getEvents({ searchEvent: debouceValue, page }),
	})

	return { data, isLoading, search, setSearch, page, setPage }
}
