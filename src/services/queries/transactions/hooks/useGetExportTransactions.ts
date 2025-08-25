'use client'

import { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getExportTransactions } from '../usecases'

export const useGetExportTransactionsData = (event_id: string) => {
	const { isError, isFetching, data }: UseQueryResult<BlobPart> = useQuery({
		queryKey: [QUERY_KEYS.TRANSACTIONS_EXPORT_DATA, event_id],
		queryFn: () => getExportTransactions(event_id),
		enabled: !!event_id,
		staleTime: 100,
	})

	return { isError, isFetching, data }
}
