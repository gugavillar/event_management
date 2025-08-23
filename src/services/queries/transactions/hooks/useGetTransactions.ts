'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useQueryState, parseAsInteger } from 'nuqs'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { TransactionsFromAPI } from '../transations.types'
import { getTransactions } from '../usecases'

export const useGetTransactions = () => {
	const [eventId, setEventId] = useQueryState('eventId', {
		defaultValue: '',
	})
	const [page, setPage] = useQueryState(
		'pageTransaction',
		parseAsInteger.withDefault(1),
	)

	const debouceValue = useDebounce(eventId, 500)
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouceValue])

	const { data, isLoading }: UseQueryResult<Array<TransactionsFromAPI>> =
		useQuery({
			queryKey: [QUERY_KEYS.TRANSACTIONS, debouceValue, page],
			queryFn: () => getTransactions({ eventId: debouceValue, page }),
		})

	return { data, isLoading, eventId, setEventId, page, setPage }
}
