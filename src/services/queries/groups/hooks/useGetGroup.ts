'use client'
import { UseQueryResult } from '@tanstack/react-query'

import { MEMBERS, QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { GroupAPI } from '../groups.types'
import { getGroup } from '../usecases'

export const useGetGroup = (groupId: GroupAPI['id'] | null) => {
	const query: UseQueryResult<GroupAPI> = useQuery({
		queryKey: [QUERY_KEYS.GROUP, groupId],
		queryFn: () => getGroup(groupId as GroupAPI['id']),
		retry: 0,
		enabled: !!groupId,
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

	return { ...query }
}
