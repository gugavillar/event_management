'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { getUsers } from '../usecases'
import { UsersFromAPI } from '../users.type'

export const useGetUsers = () => {
	const searchParams = useSearchParams()
	const [search, setSearch] = useState(searchParams.get('searchUser') || '')
	const [page, setPage] = useState(Number(searchParams.get('pageUser')) || 1)

	const debouceValue = useDebounce(search, 500)

	useEffect(() => {
		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouceValue])

	useAddSearchParams({
		searchUser: debouceValue,
		pageUser: page.toString(),
	})

	const query: UseQueryResult<UsersFromAPI> = useQuery({
		queryKey: [QUERY_KEYS.USERS, debouceValue, page],
		queryFn: () => getUsers({ searchUser: debouceValue, page }),
		retry: 0,
	})

	return { ...query, search, setSearch, page, setPage }
}
