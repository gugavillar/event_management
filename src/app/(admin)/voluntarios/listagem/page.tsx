import { Volunteers } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import {
	getVolunteers,
	getFunctions,
	getVolunteersCities,
} from '@/services/queries/volunteers'

type SearchParams = {
	searchParams: Promise<{
		searchVolunteer?: string
		eventId?: string
		statusVolunteer?: string
		roleVolunteer?: string
		pageVolunteer?: string
		cityVolunteer?: string
	}>
}

export default async function VolunteersPage({ searchParams }: SearchParams) {
	const params = await searchParams.then((res) => ({
		searchVolunteer: res.searchVolunteer ?? '',
		eventId: res.eventId ?? '',
		statusVolunteer: res.statusVolunteer ?? '',
		roleVolunteer: res.roleVolunteer ?? '',
		pageVolunteer: res.pageVolunteer ?? '',
		cityVolunteer: res.cityVolunteer ?? '',
	}))
	const debounceSearchValue = params.searchVolunteer
	const debounceEventIdValue = params.eventId
	const debounceStatusValue = params.statusVolunteer
	const debounceRoleValue = params.roleVolunteer
	const debounceCityValue = params.cityVolunteer
	const page = generatePage(params.pageVolunteer)

	const [getAllEvents, getAllVolunteers, getAllFunctions, getCities] =
		await Promise.all([
			async () => getEvents({ searchEvent: '', page: 1 }),
			async () =>
				getVolunteers({
					searchVolunteer: debounceSearchValue,
					eventId: debounceEventIdValue,
					statusVolunteer: debounceStatusValue,
					roleVolunteer: debounceRoleValue,
					volunteerCity: debounceCityValue,
					page,
				}),
			async () =>
				getFunctions({ searchFunction: '', eventId: debounceEventIdValue }),
			async () => getVolunteersCities(),
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
					debounceCityValue,
					page,
				]}
			>
				<HydrationProvider
					queryFn={getCities}
					queryKey={[QUERY_KEYS.VOLUNTEERS_CITIES]}
				>
					<HydrationProvider
						queryFn={getAllFunctions}
						queryKey={[
							QUERY_KEYS.VOLUNTEERS_FUNCTIONS,
							'',
							debounceEventIdValue,
						]}
					>
						<Volunteers />
					</HydrationProvider>
				</HydrationProvider>
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
