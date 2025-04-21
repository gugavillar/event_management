import { Volunteers } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'

export default async function VolunteersPage() {
	const [getAllEvents] = await Promise.all([
		async () => getEvents({ searchEvent: '' }),
	])
	return (
		<HydrationProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS, '']}
		>
			<Volunteers />
		</HydrationProvider>
	)
}
