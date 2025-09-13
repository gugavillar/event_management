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

import { getPayments } from '../usecases'
import { VolunteersFromAPI } from '../volunteers.type'

export const useGetPayments = () => {
	const [query, setQuery] = useQueryStates({
		eventId: parseAsString.withDefault(''),
		paymentType: parseAsString.withDefault(''),
		city: parseAsString.withDefault(''),
	})
	const [search, setSearch] = useQueryState('searchVolunteer', {
		defaultValue: '',
	})
	const [page, setPage] = useQueryState(
		'pageVolunteerPayment',
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

	const { isLoading, data }: UseQueryResult<VolunteersFromAPI> = useQuery({
		queryKey: [
			QUERY_KEYS.VOLUNTEERS_PAYMENTS,
			debounceEventId,
			debounceSearch,
			debouncePaymentType,
			debounceCity,
			page,
		],
		queryFn: () =>
			getPayments({
				eventId: debounceEventId,
				searchVolunteer: debounceSearch,
				paymentType: debouncePaymentType,
				volunteerCity: debounceCity,
				page,
			}),
	})

	return {
		isLoading,
		data,
		setSearch,
		search,
		page,
		setPage,
		query,
		setQuery,
	}
}
