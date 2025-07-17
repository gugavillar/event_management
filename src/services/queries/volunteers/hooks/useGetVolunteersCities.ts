'use client'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getVolunteersCities } from '../usecases'

export const useGetVolunteersCities = () => {
	const query = useQuery({
		queryKey: [QUERY_KEYS.VOLUNTEERS_CITIES],
		queryFn: getVolunteersCities,
	})

	return { ...query }
}
