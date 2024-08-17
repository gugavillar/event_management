'use client'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getEvents } from '../usecases'

export const useGetEvents = () => {
	const [search, setSearch] = useState('')

	const debouceValue = useDebounce(search, 500)

	const query = useQuery({
		queryKey: [QUERY_KEYS.EVENTS, debouceValue],
		queryFn: () => getEvents({ search: debouceValue }),
		retry: 0,
	})

	return { ...query, search, setSearch }
}
