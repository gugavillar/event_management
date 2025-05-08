import { Events } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'

export default async function EventsPage({
	searchParams,
}: {
	searchParams: { searchEvent: string; pageEvent: string }
}) {
	const debounceValue = searchParams.searchEvent ?? ''
	const page = Number(searchParams.pageEvent) ?? 1

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
