'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useQueryState } from 'nuqs'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { GroupAPI } from '../groups.types'
import { getGroupByEventId } from '../usecases'

export const useGetGroupByEventId = (eventId: string) => {
	const [groupEventId, setGroupEventId] = useQueryState('eventId', {
		defaultValue: eventId,
	})
	const [searchMemberGroup, setSearchMemberGroup] = useQueryState(
		'searchMemberGroup',
		{
			defaultValue: '',
		},
	)

	const debounceSearchMember = useDebounce(searchMemberGroup, 500)

	const query: UseQueryResult<Array<GroupAPI>> = useQuery({
		queryKey: [QUERY_KEYS.GROUPS, groupEventId, debounceSearchMember],
		queryFn: () =>
			getGroupByEventId(groupEventId as GroupAPI['id'], debounceSearchMember),
		enabled: !!groupEventId,
	})

	return {
		...query,
		groupEventId,
		setGroupEventId,
		searchMemberGroup,
		setSearchMemberGroup,
	}
}
