'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { GroupAPI } from '../groups.types'
import { getGroupByEventId } from '../usecases'

export const useGetGroupByEventId = (eventId?: string) => {
	const [groupEventId, setGroupEventId] = useState(eventId ?? '')

	const query: UseQueryResult<Array<GroupAPI>> = useQuery({
		queryKey: [QUERY_KEYS.GROUPS, groupEventId],
		queryFn: () => getGroupByEventId(groupEventId as GroupAPI['id']),
		retry: 0,
		enabled: !!groupEventId,
	})

	useAddSearchParams({
		groupEventId,
	})

	return {
		...query,
		groupEventId,
		setGroupEventId,
	}
}
