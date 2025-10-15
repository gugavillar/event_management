'use client'
import type { UseQueryResult } from '@tanstack/react-query'
import type { UUID } from 'crypto'
import { format } from 'date-fns'

import { QUERY_KEYS } from '@/constants'
import { formatPhone } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'

import type { ParticipantsAPI } from '../participants.type'
import { getParticipant } from '../usecases'

type FormattedParticipantsAPI = Omit<ParticipantsAPI, 'address'> & {
	address: Extract<ParticipantsAPI['address'], { id: UUID }>
	hasReligion: 'Yes' | 'No'
	hasHealth: 'Yes' | 'No'
}

export const useGetParticipant = (participantId: ParticipantsAPI['id'] | null) => {
	const { data, isLoading }: UseQueryResult<FormattedParticipantsAPI> = useQuery({
		enabled: !!participantId,
		queryFn: () => getParticipant(participantId as ParticipantsAPI['id']),
		queryKey: [QUERY_KEYS.PARTICIPANT, participantId],
		select: ({ address, ...data }: ParticipantsAPI) => ({
			...data,
			address: {
				...address,
			},
			birthdate: format(data.birthdate, 'dd/MM/yyyy'),
			hasHealth: data.health ? 'Yes' : ('No' as 'Yes' | 'No'),
			hasReligion: data.religion ? 'Yes' : ('No' as 'Yes' | 'No'),
			hostPhone: formatPhone(data.hostPhone),
			phone: formatPhone(data.phone),
			responsiblePhone: formatPhone(data.responsiblePhone),
		}),
	})

	return { data, isLoading }
}
