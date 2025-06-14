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

	const [dashboardData, getAllEvents] = await Promise.all([
		async () => await getDashboardData({ eventId: debounceEventId }),
		async () => getEvents({ searchEvent: '', page: 1 }),
	])

	return (
		<HydrationProvider
			queryFn={dashboardData}
			queryKey={[QUERY_KEYS.DASHBOARD, debounceEventId]}
		>
			<HydrationInfinityProvider
				queryFn={getAllEvents}
				queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
				initialPageParam={1}
			>
				<Dashboard />
			</HydrationInfinityProvider>
		</HydrationProvider>
	)
}
