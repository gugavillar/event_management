import { Groups } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { getEvents } from '@/services/queries/events'

export default async function GroupsPage() {
	const getAllEvents = async () => getEvents({ searchEvent: '', page: 1 })

	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			initialPageParam={1}
		>
			<Groups />
		</HydrationInfinityProvider>
	)
}
