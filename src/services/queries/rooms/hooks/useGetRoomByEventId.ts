'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useAddSearchParams } from '@/hooks'
import { useQuery } from '@/providers/QueryProvider'

import { RoomAPI } from '../rooms.types'
import { getRoomByEventId } from '../usecases'

export const useGetRoomByEventId = (eventId?: string) => {
	const [roomEventId, setRoomEventId] = useState(eventId ?? '')

	const query: UseQueryResult<Array<RoomAPI>> = useQuery({
		queryKey: [QUERY_KEYS.ROOMS, roomEventId],
		queryFn: () => getRoomByEventId(roomEventId as RoomAPI['id']),
		retry: 0,
		enabled: !!roomEventId,
	})

	useAddSearchParams({
		roomEventId,
	})

	return {
		...query,
		roomEventId,
		setRoomEventId,
	}
}
