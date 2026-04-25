'use client'
import { QueryClientProvider, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getQueryClient } from '@/constants'

export { useInfiniteQuery, useMutation, useQuery, useQueryClient }

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = getQueryClient()
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
