import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { getQueryClient } from '@/constants'

type HydrationInfinityProviderProps = {
	children: ReactNode
	queryFn: () => Promise<unknown>
	queryKey: Array<unknown>
	initialPageParam: number
}

export const HydrationInfinityProvider = async ({
	queryFn,
	queryKey,
	initialPageParam,
	children,
}: HydrationInfinityProviderProps) => {
	const query = getQueryClient()

	await query.prefetchInfiniteQuery({
		queryKey,
		queryFn,
		initialPageParam,
	})

	return (
		<HydrationBoundary state={dehydrate(query)}>{children}</HydrationBoundary>
	)
}
