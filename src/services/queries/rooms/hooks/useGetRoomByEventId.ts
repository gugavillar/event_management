'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useQueryState } from 'nuqs'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { RoomAPI } from '../rooms.types'
import { getRoomByEventId } from '../usecases'

export const useGetRoomByEventId = (eventId: string) => {
	const [roomEventId, setRoomEventId] = useQueryState('eventId', {
		defaultValue: eventId,
	})
	const [searchMemberRoom, setSearchMemberRoom] = useQueryState(
		'searchMemberRoom',
		{
			defaultValue: '',
		},
	)

	const debounceSearchMember = useDebounce(searchMemberRoom, 500)

	const { isLoading, data }: UseQueryResult<Array<RoomAPI>> = useQuery({
		queryKey: [QUERY_KEYS.ROOMS, roomEventId, debounceSearchMember],
		queryFn: () =>
			getRoomByEventId(roomEventId as RoomAPI['id'], debounceSearchMember),
		enabled: !!roomEventId,
	})

	return {
		isLoading,
		data,
		roomEventId,
		setRoomEventId,
		searchMemberRoom,
		setSearchMemberRoom,
	}
}
