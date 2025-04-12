import { Events } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'

export default async function EventsPage({
	searchParams,
}: {
	searchParams: { search: string }
}) {
	const debounceValue = searchParams.search ?? ''
	const getAllEvents = async () => getEvents({ search: debounceValue })
	return (
		<HydrationProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS, debounceValue]}
		>
			<Events />
		</HydrationProvider>
	)
}
