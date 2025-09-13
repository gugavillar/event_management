'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import {
	parseAsInteger,
	parseAsString,
	useQueryState,
	useQueryStates,
} from 'nuqs'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { ParticipantsFromAPI } from '../participants.type'
import { getPayments } from '../usecases'

export const useGetPayments = () => {
	const [query, setQuery] = useQueryStates({
		eventId: parseAsString.withDefault(''),
		paymentType: parseAsString.withDefault(''),
		city: parseAsString.withDefault(''),
	})
	const [search, setSearch] = useQueryState('searchParticipant', {
		defaultValue: '',
	})
	const [page, setPage] = useQueryState(
		'pageParticipantPayment',
		parseAsInteger.withDefault(1),
	)

	const debounceEventId = useDebounce(query.eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debouncePaymentType = useDebounce(query.paymentType, 500)
	const debounceCity = useDebounce(query.city, 500)
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceEventId, debounceSearch, debouncePaymentType, debounceCity])

	const { data, isLoading }: UseQueryResult<ParticipantsFromAPI> = useQuery({
		queryKey: [
			QUERY_KEYS.PARTICIPANTS_PAYMENTS,
			debounceEventId,
			debounceSearch,
			debouncePaymentType,
			debounceCity,
			page,
		],
		queryFn: () =>
			getPayments({
				eventId: debounceEventId,
				searchParticipant: debounceSearch,
				paymentType: debouncePaymentType,
				participantCity: debounceCity,
				page,
			}),
	})

	return {
		data,
		isLoading,
		setSearch,
		search,
		page,
		setPage,
		query,
		setQuery,
	}
}
