import { Events } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'

export default async function EventsPage({
	searchParams,
}: {
	searchParams: { searchEvent: string; pageEvent: string }
}) {
	const debounceValue = searchParams.searchEvent ?? ''
	const page = generatePage(searchParams.pageEvent)

	const getAllEvents = async () =>
		getEvents({ searchEvent: debounceValue, page })
	return (
		<HydrationProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS, debounceValue, page]}
		>
			<Events />
		</HydrationProvider>
	)
}
