'use client'
import type { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getUsers } from '../usecases'
import type { UsersFromAPI } from '../users.type'

export const useGetUsers = () => {
	const [search, setSearch] = useQueryState('searchUser', {
		defaultValue: '',
	})
	const [page, setPage] = useQueryState('pageUser', parseAsInteger.withDefault(1))

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

	const { data, isLoading }: UseQueryResult<UsersFromAPI> = useQuery({
		queryFn: () => getUsers({ page, searchUser: debouceValue }),
		queryKey: [QUERY_KEYS.USERS, debouceValue, page],
	})

	return { data, isLoading, page, search, setPage, setSearch }
}
