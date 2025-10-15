'use client'
import type { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'
import { useDebounce } from '@uidotdev/usehooks'
import { useQueryState } from 'nuqs'
import type { RoomAPI } from '../rooms.types'
import { getRoomByEventId } from '../usecases'

export const useGetRoomByEventId = (eventId: string) => {
	const [roomEventId, setRoomEventId] = useQueryState('eventId', {
		defaultValue: eventId,
	})
	const [searchMemberRoom, setSearchMemberRoom] = useQueryState(
		'searchMemberRoom',
		{
			defaultValue: '',
		}
	)

	const debounceSearchMember = useDebounce(searchMemberRoom, 500)

	const { isLoading, data }: UseQueryResult<Array<RoomAPI>> = useQuery({
		enabled: !!roomEventId,
		queryFn: () =>
			getRoomByEventId(roomEventId as RoomAPI['id'], debounceSearchMember),
		queryKey: [QUERY_KEYS.ROOMS, roomEventId, debounceSearchMember],
	})

	return {
		data,
		isLoading,
		roomEventId,
		searchMemberRoom,
		setRoomEventId,
		setSearchMemberRoom,
	}
}
