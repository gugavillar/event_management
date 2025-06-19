import { VolunteersFunctions } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getFunctions } from '@/services/queries/volunteers'

type SearchParams = {
	searchParams: Promise<{
		eventId?: string
		searchFunction?: string
	}>
}

export default async function VolunteersFunctionsPage({
	searchParams,
}: SearchParams) {
	const params = await searchParams.then((res) => ({
		searchFunction: res.searchFunction ?? '',
		eventId: res.eventId ?? '',
	}))
	const debounceValue = params.searchFunction
	const debounceEventId = params.eventId

	const [getAllFunctions, getAllEvents] = await Promise.all([
		async () =>
			getFunctions({ searchFunction: debounceValue, eventId: debounceEventId }),
		async () => getEvents({ searchEvent: '', page: 1 }),
	])

	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			initialPageParam={1}
		>
			<HydrationProvider
				queryFn={getAllFunctions}
				queryKey={[
					QUERY_KEYS.VOLUNTEERS_FUNCTIONS,
					debounceValue,
					debounceEventId,
				]}
			>
				<VolunteersFunctions />
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
