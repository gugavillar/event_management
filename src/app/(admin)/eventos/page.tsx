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
		pageEvent: res.pageEvent ?? '',
		searchEvent: res.searchEvent ?? '',
	}))
	const debounceValue = params.searchEvent
	const page = generatePage(params.pageEvent)

	const getAllEvents = () => getEvents({ page, searchEvent: debounceValue })

	return (
		<HydrationProvider queryFn={getAllEvents} queryKey={[QUERY_KEYS.EVENTS, debounceValue, page]}>
			<Events />
		</HydrationProvider>
	)
}
