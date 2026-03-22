'use client'
import type { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getUser } from '../usecases'
import type { UserAPI } from '../users.type'

export const useGetUser = (userId: UserAPI['id'] | null) => {
	const { data, isLoading }: UseQueryResult<{ role: UserAPI['role'] }> = useQuery({
		enabled: !!userId,
		queryFn: () => getUser(userId as UserAPI['id']),
		queryKey: [QUERY_KEYS.USER, userId],
	})

	return { data, isLoading }
}
