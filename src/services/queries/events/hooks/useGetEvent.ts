'use client'
import type { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { currencyValue } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'
import { format } from 'date-fns'
import type { EventsAPI } from '../event.type'
import { getEvent } from '../usecases'

type EventFormatted = Omit<EventsAPI, 'initialDate' | 'finalDate'> & {
	initialDate: string
	finalDate: string
}

export const useGetEvent = (eventId: EventsAPI['id'] | null) => {
	const { data, isLoading }: UseQueryResult<EventFormatted> = useQuery({
		enabled: !!eventId,
		queryFn: () => getEvent(eventId as EventsAPI['id']),
		queryKey: [QUERY_KEYS.EVENT, eventId],
		select: (data: EventsAPI) => ({
			...data,
			finalDate: format(data.finalDate, 'dd/MM/yyyy'),
			initialDate: format(data.initialDate, 'dd/MM/yyyy'),
			participantPrice: currencyValue(Number(data.participantPrice)),
			volunteerPrice: currencyValue(Number(data.volunteerPrice)),
		}),
	})

	return { data, isLoading }
}
