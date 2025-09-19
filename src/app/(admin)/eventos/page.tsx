import { Events } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'

type SearchParams = {
	searchParams: Promise<{
		searchEvent?: string
		pageEvent?: string
	}>
}

export default async function EventsPage({ searchParams }: SearchParams) {
	const params = await searchParams.then((res) => ({
		searchEvent: res.searchEvent ?? '',
		pageEvent: res.pageEvent ?? '',
	}))
	const debounceValue = params.searchEvent
	const page = generatePage(params.pageEvent)

	const getAllEvents = () => getEvents({ searchEvent: debounceValue, page })

	return (
		<HydrationProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS, debounceValue, page]}
		>
			<Events />
		</HydrationProvider>
	)
}
