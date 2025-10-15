'use client'
import type { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'
import { useQueryState } from 'nuqs'
import type { DashboardFromAPI } from '../dashboard.types'
import { getDashboardData } from '../usecases'

export const useGetDashboardData = () => {
	const [eventId, setEventId] = useQueryState('eventId', {
		defaultValue: '',
	})

	const { data, isLoading }: UseQueryResult<DashboardFromAPI> = useQuery({
		enabled: !!eventId,
		queryFn: () =>
			getDashboardData({
				eventId,
			}),
		queryKey: [QUERY_KEYS.DASHBOARD, eventId],
	})

	return { data, eventId, isLoading, setEventId }
}
