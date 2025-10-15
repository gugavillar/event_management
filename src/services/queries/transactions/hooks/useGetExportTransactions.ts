'use client'

import type { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getExportTransactions } from '../usecases'

export const useGetExportTransactionsData = (event_id: string, transactionLength?: number) => {
	const { isError, isFetching, data }: UseQueryResult<BlobPart> = useQuery({
		enabled: !!event_id && !!transactionLength,
		queryFn: () => getExportTransactions(event_id),
		queryKey: [QUERY_KEYS.TRANSACTIONS_EXPORT_DATA, event_id],
		staleTime: 100,
	})

	return { data, isError, isFetching }
}
