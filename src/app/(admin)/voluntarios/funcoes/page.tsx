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

export default async function VolunteersFunctionsPage({ searchParams }: SearchParams) {
	const params = await searchParams.then((res) => ({
		eventId: res.eventId ?? '',
		searchFunction: res.searchFunction ?? '',
	}))
	const debounceValue = params.searchFunction
	const debounceEventId = params.eventId

	const getAllFunctions = () => getFunctions({ eventId: debounceEventId, searchFunction: debounceValue })
	const getAllEvents = () => getEvents({ page: 1, searchEvent: '' })

	return (
		<HydrationInfinityProvider initialPageParam={1} queryFn={getAllEvents} queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}>
			<HydrationProvider
				queryFn={getAllFunctions}
				queryKey={[QUERY_KEYS.VOLUNTEERS_FUNCTIONS, debounceValue, debounceEventId]}
			>
				<VolunteersFunctions />
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
