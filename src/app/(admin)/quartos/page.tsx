import { UUID } from 'crypto'

import { Rooms } from '@/components/Templates/Rooms'
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

	const [getAllEvents, getRooms] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
		async () => getRoomByEventId(eventId as UUID, searchMemberRoom),
	])

	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			initialPageParam={1}
		>
			<HydrationProvider
				queryFn={getRooms}
				queryKey={[QUERY_KEYS.ROOMS, eventId]}
			>
				<Rooms eventId={eventId} />
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
