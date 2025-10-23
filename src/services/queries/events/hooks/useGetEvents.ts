'use client'
import type { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import type { EventsFromAPI } from '../event.type'
import { getEvents } from '../usecases'

export const useGetEvents = () => {
	const [search, setSearch] = useQueryState('searchEvent', {
		defaultValue: '',
	})
	const [page, setPage] = useQueryState('pageEvent', parseAsInteger.withDefault(1))

	const debouceValue = useDebounce(search, 500)
	const isFirstRender = useRef(true)

	//biome-ignore lint: necessary to get back to page one
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (page !== 1) setPage(1)
	}, [debouceValue])

	const { data, isLoading }: UseQueryResult<EventsFromAPI> = useQuery({
		queryFn: () => getEvents({ page, searchEvent: debouceValue }),
		queryKey: [QUERY_KEYS.EVENTS, debouceValue, page],
	})

	return { data, isLoading, page, search, setPage, setSearch }
}
