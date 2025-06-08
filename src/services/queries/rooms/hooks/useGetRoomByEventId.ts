'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { RoomAPI } from '../rooms.types'
import { getRoomByEventId } from '../usecases'

export const useGetRoomByEventId = (eventId?: string) => {
	const searchParams = useSearchParams()
	const [roomEventId, setRoomEventId] = useState(eventId ?? '')
	const [searchMemberRoom, setSearchMemberRoom] = useState(
		searchParams.get('searchMemberRoom') || '',
	)

	const debounceSearchMember = useDebounce(searchMemberRoom, 500)

	const query: UseQueryResult<Array<RoomAPI>> = useQuery({
		queryKey: [QUERY_KEYS.ROOMS, roomEventId, debounceSearchMember],
		queryFn: () =>
			getRoomByEventId(roomEventId as RoomAPI['id'], debounceSearchMember),
		retry: 0,
		enabled: !!roomEventId,
	})

	useAddSearchParams({
		roomEventId,
		searchMemberRoom: debounceSearchMember,
	})

	return {
		...query,
		roomEventId,
		setRoomEventId,
		searchMemberRoom,
		setSearchMemberRoom,
	}
}
