'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { format } from 'date-fns'

import { QUERY_KEYS } from '@/constants'
import { currencyValue } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'

import { EventsAPI } from '../event.type'
import { getEvent } from '../usecases'

type EventFormatted = Omit<EventsAPI, 'initialDate' | 'finalDate'> & {
	initialDate: string
	finalDate: string
}

export const useGetEvent = (eventId: EventsAPI['id'] | null) => {
	const { data, isLoading }: UseQueryResult<EventFormatted> = useQuery({
		queryKey: [QUERY_KEYS.EVENT, eventId],
		queryFn: () => getEvent(eventId as EventsAPI['id']),
		enabled: !!eventId,
		select: (data: EventsAPI) => ({
			...data,
			initialDate: format(data.initialDate, 'dd/MM/yyyy'),
			finalDate: format(data.finalDate, 'dd/MM/yyyy'),
			participantPrice: currencyValue(Number(data.participantPrice)),
			volunteerPrice: currencyValue(Number(data.volunteerPrice)),
		}),
	})

	return { data, isLoading }
}
