import { Volunteers } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getVolunteers } from '@/services/queries/volunteers'

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
	const [getAllEvents, getAllVolunteers] = await Promise.all([
		async () => getEvents({ searchEvent: '' }),
		async () =>
			getVolunteers({
				searchVolunteer: debounceSearchValue,
				eventId: debounceEventIdValue,
				statusVolunteer: debounceStatusValue,
			}),
	])
	return (
		<HydrationProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS, '']}
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
				<Volunteers />
			</HydrationProvider>
		</HydrationProvider>
	)
}
