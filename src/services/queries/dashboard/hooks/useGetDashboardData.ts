'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { DashboardFromAPI } from '../dashboard.types'
import { getDashboardData } from '../usecases'

export const useGetDashboardData = () => {
	const [eventId, setEventId] = useQueryState('eventId', {
		defaultValue: '',
	})

	const { data, isLoading }: UseQueryResult<DashboardFromAPI> = useQuery({
		queryKey: [QUERY_KEYS.DASHBOARD, eventId],
		queryFn: () =>
			getDashboardData({
				eventId,
			}),
		enabled: !!eventId,
	})

	return { data, isLoading, eventId, setEventId }
}
