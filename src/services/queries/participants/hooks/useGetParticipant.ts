'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { format } from 'date-fns'

import { UUID } from 'crypto'

import { QUERY_KEYS } from '@/constants'
import { formatPhone } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'

import { ParticipantsAPI } from '../participants.type'
import { getParticipant } from '../usecases'

type FormattedParticipantsAPI = Omit<ParticipantsAPI, 'Address'> & {
	address: Extract<ParticipantsAPI['Address'], { id: UUID }>
	hasReligion: 'Yes' | 'No'
}

export const useGetParticipant = (
	participantId: ParticipantsAPI['id'] | null,
) => {
	const query: UseQueryResult<FormattedParticipantsAPI> = useQuery({
		queryKey: [QUERY_KEYS.PARTICIPANT, participantId],
		queryFn: () => getParticipant(participantId as ParticipantsAPI['id']),
		retry: 0,
		enabled: !!participantId,
		select: ({ Address, ...data }: ParticipantsAPI) => ({
			...data,
			birthdate: format(data.birthdate, 'dd/MM/yyyy'),
			phone: formatPhone(data.phone),
			responsiblePhone: formatPhone(data.responsiblePhone),
			hostPhone: formatPhone(data.hostPhone),
			hasReligion: data.religion ? 'Yes' : 'No',
			address: {
				...Address,
			},
		}),
	})

	return { ...query }
}
