import type { UUID } from 'node:crypto'

import { Rooms } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getRoomByEventId } from '@/services/queries/rooms'

type SearchParams = {
	searchParams: Promise<{
		roomEventId?: string
		searchMemberRoom?: string
	}>
}

export default async function RoomsPage({ searchParams }: SearchParams) {
	const params = await searchParams.then((res) => ({
		roomEventId: res.roomEventId ?? '',
		searchMemberRoom: res.searchMemberRoom ?? '',
	}))
	const eventId = params.roomEventId
	const searchMemberRoom = params.searchMemberRoom

	const getAllEvents = () => getEvents({ page: 1, searchEvent: '' })
	const getRooms = () => getRoomByEventId(eventId as UUID, searchMemberRoom)

	return (
		<HydrationInfinityProvider initialPageParam={1} queryFn={getAllEvents} queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}>
			<HydrationProvider queryFn={getRooms} queryKey={[QUERY_KEYS.ROOMS, eventId]}>
				<Rooms eventId={eventId} />
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
