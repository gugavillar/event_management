'use client'
import {
	QueryClientProvider,
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
} from '@tanstack/react-query'

import { getQueryClient } from '@/constants'

export { useQuery, useMutation, useQueryClient, useInfiniteQuery }

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = getQueryClient()
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
