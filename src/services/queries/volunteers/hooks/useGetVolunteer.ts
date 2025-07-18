'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { format } from 'date-fns'

import { UUID } from 'crypto'

import { QUERY_KEYS } from '@/constants'
import { formatPhone } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'

import { getVolunteer } from '../usecases'
import { VolunteersAPI } from '../volunteers.type'

type FormattedVolunteersAPI = Omit<VolunteersAPI, 'address'> & {
	address: Extract<VolunteersAPI['address'], { id: UUID }>
	hasCell: 'Yes' | 'No'
	hasHealth: 'Yes' | 'No'
}

export const useGetVolunteer = (volunteerId: VolunteersAPI['id'] | null) => {
	const query: UseQueryResult<FormattedVolunteersAPI> = useQuery({
		queryKey: [QUERY_KEYS.VOLUNTEER, volunteerId],
		queryFn: () => getVolunteer(volunteerId as VolunteersAPI['id']),
		enabled: !!volunteerId,
		select: ({ address, ...data }: VolunteersAPI) => ({
			...data,
			birthdate: format(data.birthdate, 'dd/MM/yyyy'),
			phone: formatPhone(data.phone),
			relativePhone: formatPhone(data.relativePhone),
			hasCell: data.cell ? 'Yes' : ('No' as 'Yes' | 'No'),
			hasHealth: data.health ? 'Yes' : ('No' as 'Yes' | 'No'),
			address: {
				...address,
			},
		}),
	})

	return { ...query }
}
