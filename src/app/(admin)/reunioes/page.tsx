import { Meetings } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { getEvents } from '@/services/queries/events'

export default async function MeetingsPage() {
	const getAllEvents = async () => getEvents({ searchEvent: '', page: 1 })
	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			initialPageParam={1}
		>
			<Meetings />
		</HydrationInfinityProvider>
	)
}
