'use client'
import { format } from 'date-fns'

import { QUERY_KEYS } from '@/constants'
import { currencyValue } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'

import { EventsFromAPI } from '../event.type'
import { getEvent } from '../usecases'

export const useGetEvent = (eventId: EventsFromAPI['id'] | null) => {
	const query = useQuery({
		queryKey: [QUERY_KEYS.EVENTS, eventId],
		queryFn: () => getEvent(eventId as EventsFromAPI['id']),
		retry: 0,
		enabled: !!eventId,
		select: (data) => ({
			...data,
			initialDate: format(data.initialDate, 'dd/MM/yyyy'),
			finalDate: format(data.finalDate, 'dd/MM/yyyy'),
			participantPrice: currencyValue(Number(data.participantPrice)),
			volunteerPrice: currencyValue(Number(data.volunteerPrice)),
		}),
	})

	return { ...query }
}
