import { Volunteers } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getVolunteers, getFunctions } from '@/services/queries/volunteers'

export default async function VolunteersPage({
	searchParams,
}: {
	searchParams: {
		searchVolunteer: string
		eventId: string
		statusVolunteer: string
		pageVolunteer: string
	}
}) {
	const debounceSearchValue = searchParams.searchVolunteer ?? ''
	const debounceEventIdValue = searchParams.eventId ?? ''
	const debounceStatusValue = searchParams.statusVolunteer ?? ''
	const page = generatePage(searchParams.pageVolunteer)

	const [getAllEvents, getAllVolunteers, getAllFunctions] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
		async () =>
			getVolunteers({
				searchVolunteer: debounceSearchValue,
				eventId: debounceEventIdValue,
				statusVolunteer: debounceStatusValue,
				page,
			}),
		async () => getFunctions({ searchFunction: '' }),
	])

	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS, '']}
			initialPageParam={1}
		>
			<HydrationProvider
				queryFn={getAllVolunteers}
				queryKey={[
					QUERY_KEYS.VOLUNTEERS,
					debounceEventIdValue,
					debounceSearchValue,
					debounceStatusValue,
					page,
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
