'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { DashboardFromAPI } from '../dashboard.types'
import { getDashboardData } from '../usecases'

export const useGetDashboardData = () => {
	const searchParams = useSearchParams()
	const [eventId, setEventId] = useState(searchParams.get('eventId') || '')

	const debounceEventId = useDebounce(eventId, 500)

	useAddSearchParams({
		eventId: debounceEventId,
	})

	const query: UseQueryResult<DashboardFromAPI> = useQuery({
		queryKey: [QUERY_KEYS.DASHBOARD, debounceEventId],
		queryFn: () =>
			getDashboardData({
				eventId: debounceEventId,
			}),
		retry: 0,
	})

	return { ...query, eventId, setEventId }
}
