'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { ParticipantsPaymentsFromAPI } from '../participants.type'
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
	const [page, setPage] = useState(
		Number(searchParams.get('pageParticipantPayment')) || 1,
	)

	const debounceEventId = useDebounce(eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debouncePaymentType = useDebounce(paymentType, 500)

	useAddSearchParams({
		eventId: debounceEventId,
		searchParticipant: debounceSearch,
		paymentType: debouncePaymentType,
		pageParticipantPayment: page.toString(),
	})

	const query: UseQueryResult<ParticipantsPaymentsFromAPI> = useQuery({
		queryKey: [
			QUERY_KEYS.PAYMENT_PARTICIPANTS,
			debounceEventId,
			debounceSearch,
			debouncePaymentType,
			page,
		],
		queryFn: () =>
			getPayments({
				eventId: debounceEventId,
				searchParticipant: debounceSearch,
				paymentType: debouncePaymentType,
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
	}
}
