import { Volunteers } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import {
	getVolunteers,
	getVolunteersFunctions,
} from '@/services/queries/volunteers'

export default async function VolunteersPage({
	searchParams,
}: {
	searchParams: {
		searchVolunteer: string
		eventId: string
		statusVolunteer: string
	}
}) {
	const debounceSearchValue = searchParams.searchVolunteer ?? ''
	const debounceEventIdValue = searchParams.eventId ?? ''
	const debounceStatusValue = searchParams.statusVolunteer ?? ''
	const [getAllEvents, getAllVolunteers, getAllFunctions] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
		async () =>
			getVolunteers({
				searchVolunteer: debounceSearchValue,
				eventId: debounceEventIdValue,
				statusVolunteer: debounceStatusValue,
			}),
		async () => getVolunteersFunctions({ searchFunction: '' }),
	])
	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS]}
			initialPageParam={1}
		>
			<HydrationProvider
				queryFn={getAllVolunteers}
				queryKey={[
					QUERY_KEYS.VOLUNTEERS,
					debounceEventIdValue,
					debounceSearchValue,
					debounceStatusValue,
				]}
			>
				<HydrationProvider
					queryFn={getAllFunctions}
					queryKey={[QUERY_KEYS.VOLUNTEERS_FUNCTIONS, '']}
				>
					<Volunteers />
				</HydrationProvider>
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
