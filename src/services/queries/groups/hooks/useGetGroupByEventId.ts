'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { GroupAPI } from '../groups.types'
import { getGroupByEventId } from '../usecases'

export const useGetGroupByEventId = (eventId?: string) => {
	const searchParams = useSearchParams()
	const [groupEventId, setGroupEventId] = useState(eventId ?? '')
	const [searchMemberGroup, setSearchMemberGroup] = useState(
		searchParams.get('searchMemberGroup') || '',
	)

	const debounceSearchMember = useDebounce(searchMemberGroup, 500)

	const query: UseQueryResult<Array<GroupAPI>> = useQuery({
		queryKey: [QUERY_KEYS.GROUPS, groupEventId, debounceSearchMember],
		queryFn: () =>
			getGroupByEventId(groupEventId as GroupAPI['id'], debounceSearchMember),
		retry: 0,
		enabled: !!groupEventId,
	})

	useAddSearchParams({
		groupEventId,
		searchMemberGroup: debounceSearchMember,
	})

	return {
		...query,
		groupEventId,
		setGroupEventId,
		searchMemberGroup,
		setSearchMemberGroup,
	}
}
