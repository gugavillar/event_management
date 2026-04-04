'use client'
import type { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useQueryState } from 'nuqs'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import type { GroupAPI } from '../groups.types'
import { getGroupByEventId } from '../usecases'

export const useGetGroupByEventId = () => {
	const [groupEventId, setGroupEventId] = useQueryState('eventId', {
		defaultValue: '',
	})
	const [searchMemberGroup, setSearchMemberGroup] = useQueryState('searchMemberGroup', {
		defaultValue: '',
	})

	const debounceSearchMember = useDebounce(searchMemberGroup, 500)

	const { data, isLoading }: UseQueryResult<Array<GroupAPI>> = useQuery({
		enabled: !!groupEventId,
		placeholderData: [],
		queryFn: () => getGroupByEventId(groupEventId as GroupAPI['id'], debounceSearchMember),
		queryKey: [QUERY_KEYS.GROUPS, groupEventId, debounceSearchMember],
	})

	return {
		data,
		groupEventId,
		isLoading,
		searchMemberGroup,
		setGroupEventId,
		setSearchMemberGroup,
	}
}
