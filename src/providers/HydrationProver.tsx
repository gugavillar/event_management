import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { getQueryClient } from '@/constants'

type HydrationProviderProps = {
	children: ReactNode
	queryFn: () => Promise<unknown>
	queryKey: Array<unknown>
}

export const HydrationProvider = async ({
	queryFn,
	queryKey,
	children,
}: HydrationProviderProps) => {
	const query = getQueryClient()

	await query.prefetchQuery({
		queryKey,
		queryFn,
	})

	return (
		<HydrationBoundary state={dehydrate(query)}>{children}</HydrationBoundary>
	)
}
