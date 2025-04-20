'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { format } from 'date-fns'

import { QUERY_KEYS } from '@/constants'
import { formatPhone } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'

import { ParticipantsFromAPI } from '../participants.type'
import { getParticipant } from '../usecases'

export const useGetParticipant = (
	participantId: ParticipantsFromAPI['id'] | null,
) => {
	const query: UseQueryResult<ParticipantsFromAPI> = useQuery({
		queryKey: [QUERY_KEYS.PARTICIPANT, participantId],
		queryFn: () => getParticipant(participantId as ParticipantsFromAPI['id']),
		retry: 0,
		enabled: !!participantId,
		select: (data) => ({
			...data,
			birthdate: format(data.birthdate, 'dd/MM/yyyy'),
			contact: formatPhone(data.contact),
			contactParent: formatPhone(data.contactParent),
			contactHost: formatPhone(data.contactHost),
			street: data.Address.street,
			neighborhood: data.Address.neighborhood,
			number: data.Address.number,
			city: data.Address.city,
			state: data.Address.state,
		}),
	})

	return { ...query }
}
