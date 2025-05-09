'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { format } from 'date-fns'

import { QUERY_KEYS } from '@/constants'
import { formatPhone } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'

import { getVolunteer } from '../usecases'
import { VolunteersAPI } from '../volunteers.type'

export const useGetVolunteer = (volunteerId: VolunteersAPI['id'] | null) => {
	const query: UseQueryResult<VolunteersAPI> = useQuery({
		queryKey: [QUERY_KEYS.VOLUNTEER, volunteerId],
		queryFn: () => getVolunteer(volunteerId as VolunteersAPI['id']),
		retry: 0,
		enabled: !!volunteerId,
		select: (data) => ({
			...data,
			birthdate: format(data.birthdate, 'dd/MM/yyyy'),
			contact: formatPhone(data.contact),
			contactParent: formatPhone(data.contactParent),
			street: data.Address.street,
			neighborhood: data.Address.neighborhood,
			number: data.Address.number,
			city: data.Address.city,
			state: data.Address.state,
		}),
	})

	return { ...query }
}
