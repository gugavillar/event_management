'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

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

	const debounceEventId = useDebounce(eventId, 500)
	const debounceSearch = useDebounce(search, 500)
	const debouncePaymentType = useDebounce(paymentType, 500)

	useAddSearchParams({
		eventId: debounceEventId,
		searchVolunteer: debounceSearch,
		paymentType: debouncePaymentType,
	})

	const query: UseQueryResult<Array<VolunteersPaymentsFromAPI>> = useQuery({
		queryKey: [
			QUERY_KEYS.PAYMENT_VOLUNTEERS,
			debounceEventId,
			debounceSearch,
			debouncePaymentType,
		],
		queryFn: () =>
			getPayments({
				eventId: debounceEventId,
				searchVolunteer: debounceSearch,
				paymentType: debouncePaymentType,
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
	}
}
