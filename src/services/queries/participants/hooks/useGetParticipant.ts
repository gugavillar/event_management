'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { format } from 'date-fns'

import { UUID } from 'crypto'

import { QUERY_KEYS } from '@/constants'
import { formatPhone } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'

import { ParticipantsAPI } from '../participants.type'
import { getParticipant } from '../usecases'

type FormattedParticipantsAPI = Omit<ParticipantsAPI, 'address'> & {
	address: Extract<ParticipantsAPI['address'], { id: UUID }>
	hasReligion: 'Yes' | 'No'
	hasHealth: 'Yes' | 'No'
}

export const useGetParticipant = (
	participantId: ParticipantsAPI['id'] | null,
) => {
	const { data, isLoading }: UseQueryResult<FormattedParticipantsAPI> =
		useQuery({
			queryKey: [QUERY_KEYS.PARTICIPANT, participantId],
			queryFn: () => getParticipant(participantId as ParticipantsAPI['id']),
			enabled: !!participantId,
			select: ({ address, ...data }: ParticipantsAPI) => ({
				...data,
				birthdate: format(data.birthdate, 'dd/MM/yyyy'),
				phone: formatPhone(data.phone),
				responsiblePhone: formatPhone(data.responsiblePhone),
				hostPhone: formatPhone(data.hostPhone),
				hasReligion: data.religion ? 'Yes' : ('No' as 'Yes' | 'No'),
				hasHealth: data.health ? 'Yes' : ('No' as 'Yes' | 'No'),
				address: {
					...address,
				},
			}),
		})

	return { data, isLoading }
}
