import { Volunteers } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getVolunteers, getFunctions } from '@/services/queries/volunteers'

type SearchParams = {
	searchParams: Promise<{
		searchVolunteer?: string
		eventId?: string
		statusVolunteer?: string
		roleVolunteer?: string
		pageVolunteer?: string
	}>
}

export default async function VolunteersPage({ searchParams }: SearchParams) {
	const params = await searchParams.then((res) => ({
		searchVolunteer: res.searchVolunteer ?? '',
		eventId: res.eventId ?? '',
		statusVolunteer: res.statusVolunteer ?? '',
		roleVolunteer: res.roleVolunteer ?? '',
		pageVolunteer: res.pageVolunteer ?? '',
	}))
	const debounceSearchValue = params.searchVolunteer
	const debounceEventIdValue = params.eventId
	const debounceStatusValue = params.statusVolunteer
	const debounceRoleValue = params.roleVolunteer
	const page = generatePage(params.pageVolunteer)

	const [getAllEvents, getAllVolunteers, getAllFunctions] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
		async () =>
			getVolunteers({
				searchVolunteer: debounceSearchValue,
				eventId: debounceEventIdValue,
				statusVolunteer: debounceStatusValue,
				roleVolunteer: debounceRoleValue,
				page,
			}),
		async () => getFunctions({ searchFunction: '' }),
	])

	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			initialPageParam={1}
		>
			<HydrationProvider
				queryFn={getAllVolunteers}
				queryKey={[
					QUERY_KEYS.VOLUNTEERS,
					debounceEventIdValue,
					debounceSearchValue,
					debounceStatusValue,
					debounceRoleValue,
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
