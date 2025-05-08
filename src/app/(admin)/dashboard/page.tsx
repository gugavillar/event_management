import { Dashboard } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getDashboardData } from '@/services/queries/dashboard'
import { getEvents } from '@/services/queries/events'

export default async function DashboardPage({
	searchParams,
}: {
	searchParams: {
		eventId: string
	}
}) {
	const debounceEventIdValue = searchParams.eventId ?? ''
	const [dashboardData, getAllEvents] = await Promise.all([
		async () => await getDashboardData({ eventId: debounceEventIdValue }),
		async () => getEvents({ searchEvent: '', page: 1 }),
	])

	return (
		<HydrationProvider
			queryFn={dashboardData}
			queryKey={[QUERY_KEYS.DASHBOARD, debounceEventIdValue]}
		>
			<HydrationInfinityProvider
				queryFn={getAllEvents}
				queryKey={[QUERY_KEYS.EVENTS]}
				initialPageParam={1}
			>
				<Dashboard />
			</HydrationInfinityProvider>
		</HydrationProvider>
	)
}
