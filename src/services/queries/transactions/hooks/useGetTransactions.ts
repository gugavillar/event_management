'use client'
import type { UseQueryResult } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'
import { useDebounce } from '@uidotdev/usehooks'
import { parseAsInteger, useQueryState } from 'nuqs'
import type { TransactionsFromAPI } from '../transactions.types'
import { getTransactions } from '../usecases'

export const useGetTransactions = () => {
	const [eventId, setEventId] = useQueryState('eventId', {
		defaultValue: '',
	})
	const [searchTransaction, setSearchTransaction] = useQueryState(
		'searchTransaction',
		{ defaultValue: '' }
	)
	const [page, setPage] = useQueryState(
		'pageTransaction',
		parseAsInteger.withDefault(1)
	)

	const debounceSearch = useDebounce(searchTransaction, 500)
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceSearch])

	const { data, isLoading }: UseQueryResult<TransactionsFromAPI> = useQuery({
		enabled: !!eventId,
		queryFn: () =>
			getTransactions({
				eventId,
				page,
				searchTransaction: debounceSearch,
			}),
		queryKey: [QUERY_KEYS.TRANSACTIONS, eventId, page, debounceSearch],
	})

	return {
		data,
		eventId,
		isLoading,
		page,
		searchTransaction,
		setEventId,
		setPage,
		setSearchTransaction,
	}
}
