import { Dashboard } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getDashboardData } from '@/services/queries/dashboard'
import { getEvents } from '@/services/queries/events'

type SearchParams = {
	searchParams: Promise<{
		eventId?: string
	}>
}

export default async function DashboardPage({ searchParams }: SearchParams) {
	const debounceEventId = await searchParams.then((res) => res.eventId ?? '')

	const dashboardData = () => getDashboardData({ eventId: debounceEventId })
	const getAllEvents = () => getEvents({ page: 1, searchEvent: '' })

	return (
		<HydrationProvider queryFn={dashboardData} queryKey={[QUERY_KEYS.DASHBOARD, debounceEventId]}>
			<HydrationInfinityProvider
				initialPageParam={1}
				queryFn={getAllEvents}
				queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			>
				<Dashboard />
			</HydrationInfinityProvider>
		</HydrationProvider>
	)
}
