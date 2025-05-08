'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { format } from 'date-fns'

import { QUERY_KEYS } from '@/constants'
import { formatPhone } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'

import { ParticipantsAPI } from '../participants.type'
import { getParticipant } from '../usecases'

export const useGetParticipant = (
	participantId: ParticipantsAPI['id'] | null,
) => {
	const query: UseQueryResult<ParticipantsAPI> = useQuery({
		queryKey: [QUERY_KEYS.PARTICIPANT, participantId],
		queryFn: () => getParticipant(participantId as ParticipantsAPI['id']),
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
