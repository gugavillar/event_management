import { Meetings } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { getEvents } from '@/services/queries/events'

export default async function MeetingsPage() {
	const getAllEvents = () => getEvents({ page: 1, searchEvent: '' })
	return (
		<HydrationInfinityProvider
			initialPageParam={1}
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
		>
			<Meetings />
		</HydrationInfinityProvider>
	)
}
