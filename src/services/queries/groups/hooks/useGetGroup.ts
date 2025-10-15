'use client'
import type { UseQueryResult } from '@tanstack/react-query'

import { MEMBERS, QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'
import type { GroupAPI } from '../groups.types'
import { getGroup } from '../usecases'

export const useGetGroup = (groupId: GroupAPI['id'] | null) => {
	const { data, isLoading }: UseQueryResult<GroupAPI> = useQuery({
		enabled: !!groupId,
		queryFn: () => getGroup(groupId as GroupAPI['id']),
		queryKey: [QUERY_KEYS.GROUP, groupId],
		select: (data: GroupAPI) => ({
			...data,
			members: data.members.map((member) => ({
				...member,
				member:
					member.type === MEMBERS.PARTICIPANT
						? member.participantId
						: member.volunteerId,
			})),
		}),
	})

	return { data, isLoading }
}
