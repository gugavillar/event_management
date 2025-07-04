'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { getPayments } from '../usecases'
import { VolunteersPaymentsFromAPI } from '../volunteers.type'

export const useGetPayments = () => {
	const searchParams = useSearchParams()
	const [eventId, setEventId] = useState(searchParams.get('eventId') || '')
	const [search, setSearch] = useState(
		searchParams.get('searchVolunteer') || '',
	)
	const [paymentType, setPaymentType] = useState(
		searchParams.get('paymentType') || '',
	)
	const [city, setCity] = useState(searchParams.get('cityVolunteer') || '')
	const [page, setPage] = useState(
		Number(searchParams.get('pageVolunteerPayment')) || 1,
	)

	const debounceEventId = useDebounce(eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debouncePaymentType = useDebounce(paymentType, 500)
	const debounceCity = useDebounce(city, 500)

	useEffect(() => {
		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceEventId, debounceSearch, debouncePaymentType, debounceCity])

	useAddSearchParams({
		eventId: debounceEventId,
		searchVolunteer: debounceSearch,
		paymentType: debouncePaymentType,
		cityVolunteer: debounceCity,
		pageVolunteerPayment: page.toString(),
	})

	const query: UseQueryResult<VolunteersPaymentsFromAPI> = useQuery({
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
		retry: 0,
	})

	return {
		...query,
		eventId,
		setEventId,
		setSearch,
		search,
		paymentType,
		setPaymentType,
		page,
		setPage,
		city,
		setCity,
	}
}
