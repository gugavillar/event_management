'use client'
import { UseQueryResult } from '@tanstack/react-query'

import { MEMBERS, QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { RoomAPI } from '../rooms.types'
import { getRoom } from '../usecases'

export const useGetRoom = (roomId: RoomAPI['id'] | null) => {
	const { isLoading, data }: UseQueryResult<RoomAPI> = useQuery({
		queryKey: [QUERY_KEYS.ROOM, roomId],
		queryFn: () => getRoom(roomId as RoomAPI['id']),
		enabled: !!roomId,
		select: (data: RoomAPI) => ({
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

	return { isLoading, data }
}
