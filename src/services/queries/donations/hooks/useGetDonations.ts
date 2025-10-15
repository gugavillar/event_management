'use client'
import type { UseQueryResult } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'
import { parseAsInteger, useQueryState } from 'nuqs'
import type { DonationsFromAPI } from '../donations.types'
import { getDonations } from '../usecases'

export const useGetDonations = () => {
	const [eventId, setEventId] = useQueryState('eventId', {
		defaultValue: '',
	})
	const [page, setPage] = useQueryState(
		'pageDonation',
		parseAsInteger.withDefault(1)
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
		queryFn: () => getDonations({ eventId, page }),
		queryKey: [QUERY_KEYS.DONATIONS, eventId, page],
	})

	return { data, eventId, isLoading, page, setEventId, setPage }
}
