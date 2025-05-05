import { Dashboard } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
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
		async () => getEvents({ searchEvent: '' }),
	])

	return (
		<HydrationProvider
			queryFn={dashboardData}
			queryKey={[QUERY_KEYS.DASHBOARD, debounceEventIdValue]}
		>
			<HydrationProvider
				queryFn={getAllEvents}
				queryKey={[QUERY_KEYS.EVENTS, '']}
			>
				<Dashboard />
			</HydrationProvider>
		</HydrationProvider>
	)
}
