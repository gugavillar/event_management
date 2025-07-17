'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useQueryState } from 'nuqs'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { DashboardFromAPI } from '../dashboard.types'
import { getDashboardData } from '../usecases'

export const useGetDashboardData = () => {
	const [eventId, setEventId] = useQueryState('eventId', {
		defaultValue: '',
	})

	const debounceEventId = useDebounce(eventId, 500)

	const query: UseQueryResult<DashboardFromAPI> = useQuery({
		queryKey: [QUERY_KEYS.DASHBOARD, debounceEventId],
		queryFn: () =>
			getDashboardData({
				eventId: debounceEventId,
			}),
	})

	return { ...query, eventId, setEventId }
}
