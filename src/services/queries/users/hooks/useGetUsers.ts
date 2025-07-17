'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getUsers } from '../usecases'
import { UsersFromAPI } from '../users.type'

export const useGetUsers = () => {
	const [search, setSearch] = useQueryState('searchUser', {
		defaultValue: '',
	})
	const [page, setPage] = useQueryState(
		'pageUser',
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

	const query: UseQueryResult<UsersFromAPI> = useQuery({
		queryKey: [QUERY_KEYS.USERS, debouceValue, page],
		queryFn: () => getUsers({ searchUser: debouceValue, page }),
	})

	return { ...query, search, setSearch, page, setPage }
}
