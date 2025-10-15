import { Volunteers } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getFunctions, getVolunteers, getVolunteersCities } from '@/services/queries/volunteers'

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
		cityVolunteer: res.cityVolunteer ?? '',
		eventId: res.eventId ?? '',
		pageVolunteer: res.pageVolunteer ?? '',
		roleVolunteer: res.roleVolunteer ?? '',
		searchVolunteer: res.searchVolunteer ?? '',
		statusVolunteer: res.statusVolunteer ?? '',
	}))
	const debounceSearchValue = params.searchVolunteer
	const debounceEventIdValue = params.eventId
	const debounceStatusValue = params.statusVolunteer
	const debounceRoleValue = params.roleVolunteer
	const debounceCityValue = params.cityVolunteer
	const page = generatePage(params.pageVolunteer)

	const getAllEvents = () => getEvents({ page: 1, searchEvent: '' })
	const getAllVolunteers = () =>
		getVolunteers({
			eventId: debounceEventIdValue,
			page,
			roleVolunteer: debounceRoleValue,
			searchVolunteer: debounceSearchValue,
			statusVolunteer: debounceStatusValue,
			volunteerCity: debounceCityValue,
		})
	const getAllFunctions = () => getFunctions({ eventId: debounceEventIdValue, searchFunction: '' })
	const getCities = () => getVolunteersCities(debounceEventIdValue)

	return (
		<HydrationInfinityProvider initialPageParam={1} queryFn={getAllEvents} queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}>
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
				<HydrationProvider queryFn={getCities} queryKey={[QUERY_KEYS.VOLUNTEERS_CITIES, debounceEventIdValue]}>
					<HydrationProvider
						queryFn={getAllFunctions}
						queryKey={[QUERY_KEYS.VOLUNTEERS_FUNCTIONS, '', debounceEventIdValue]}
					>
						<Volunteers />
					</HydrationProvider>
				</HydrationProvider>
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
