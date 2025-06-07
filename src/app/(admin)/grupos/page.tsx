import { UUID } from 'crypto'

import { Groups } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getGroupByEventId } from '@/services/queries/groups'

export default async function GroupsPage({
	searchParams,
}: {
	searchParams: { groupEventId: string }
}) {
	const eventId = searchParams.groupEventId ?? ''
	const [getAllEvents, getGroups] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
		async () => getGroupByEventId(eventId as UUID),
	])

	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			initialPageParam={1}
		>
			<HydrationProvider
				queryFn={getGroups}
				queryKey={[QUERY_KEYS.GROUPS, eventId]}
			>
				<Groups eventId={eventId} />
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
