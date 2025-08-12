'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useQueryState, parseAsInteger } from 'nuqs'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { DonationsFromAPI } from '../donations.types'
import { getDonations } from '../usecases'

export const useGetDonations = () => {
	const [eventId, setEventId] = useQueryState('eventId', {
		defaultValue: '',
	})
	const [page, setPage] = useQueryState(
		'pageDonation',
		parseAsInteger.withDefault(1),
	)

	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (page !== 1) setPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventId])

	const { data, isLoading }: UseQueryResult<DonationsFromAPI> = useQuery({
		queryKey: [QUERY_KEYS.DONATIONS, eventId, page],
		queryFn: () => getDonations({ eventId, page }),
	})

	return { data, isLoading, eventId, setEventId, page, setPage }
}
