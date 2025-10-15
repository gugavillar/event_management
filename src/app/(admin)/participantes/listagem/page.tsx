import { Participants } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getParticipants, getParticipantsCities } from '@/services/queries/participants'

type SearchParams = {
	searchParams: Promise<{
		searchParticipant?: string
		eventId?: string
		statusParticipant?: string
		pageParticipant?: string
		cityParticipant?: string
	}>
}

export default async function ParticipantsPage({ searchParams }: SearchParams) {
	const params = await searchParams.then((res) => ({
		cityParticipant: res.cityParticipant ?? '',
		eventId: res.eventId ?? '',
		pageParticipant: res.pageParticipant ?? '',
		searchParticipant: res.searchParticipant ?? '',
		statusParticipant: res.statusParticipant ?? '',
	}))
	const debounceSearchValue = params.searchParticipant
	const debounceEventIdValue = params.eventId
	const debounceStatusValue = params.statusParticipant
	const debounceCityValue = params.cityParticipant
	const page = generatePage(params.pageParticipant)

	const getAllEvents = () => getEvents({ page: 1, searchEvent: '' })
	const getAllParticipants = () =>
		getParticipants({
			eventId: debounceEventIdValue,
			page,
			participantCity: debounceCityValue,
			searchParticipant: debounceSearchValue,
			statusParticipant: debounceStatusValue,
		})
	const getCities = () => getParticipantsCities(false, debounceEventIdValue)

	return (
		<HydrationInfinityProvider initialPageParam={1} queryFn={getAllEvents} queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}>
			<HydrationProvider
				queryFn={getCities}
				queryKey={[QUERY_KEYS.PARTICIPANTS_CITIES, undefined, debounceEventIdValue]}
			>
				<HydrationProvider
					queryFn={getAllParticipants}
					queryKey={[
						QUERY_KEYS.PARTICIPANTS,
						debounceEventIdValue,
						debounceSearchValue,
						debounceStatusValue,
						debounceCityValue,
						undefined,
						page,
					]}
				>
					<Participants />
				</HydrationProvider>
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
