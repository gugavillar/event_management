'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { ParticipantsFromAPI } from '../participants.type'
import { getPayments } from '../usecases'

export const useGetPayments = () => {
	const searchParams = useSearchParams()
	const [eventId, setEventId] = useState(searchParams.get('eventId') || '')
	const [search, setSearch] = useState(
		searchParams.get('searchParticipant') || '',
	)
	const [paymentType, setPaymentType] = useState(
		searchParams.get('paymentType') || '',
	)
	const [city, setCity] = useState(searchParams.get('cityParticipant') || '')
	const [page, setPage] = useState(
		Number(searchParams.get('pageParticipantPayment')) || 1,
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
		searchParticipant: debounceSearch,
		paymentType: debouncePaymentType,
		cityParticipant: debounceCity,
		pageParticipantPayment: page.toString(),
	})

	const query: UseQueryResult<ParticipantsFromAPI> = useQuery({
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
