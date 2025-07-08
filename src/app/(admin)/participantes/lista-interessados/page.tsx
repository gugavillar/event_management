import { InterestedParticipants } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import {
	getParticipants,
	getParticipantsCities,
} from '@/services/queries/participants'

type SearchParams = {
	searchParams: Promise<{
		searchParticipant?: string
		eventId?: string
		statusParticipant?: string
		pageParticipant?: string
		cityParticipant?: string
	}>
}

export default async function InterestedParticipantsPage({
	searchParams,
}: SearchParams) {
	const params = await searchParams.then((res) => ({
		searchParticipant: res.searchParticipant ?? '',
		eventId: res.eventId ?? '',
		statusParticipant: res.statusParticipant ?? '',
		pageParticipant: res.pageParticipant ?? '',
		cityParticipant: res.cityParticipant ?? '',
	}))
	const debounceSearchValue = params.searchParticipant
	const debounceEventIdValue = params.eventId
	const debounceStatusValue = params.statusParticipant
	const debounceCityValue = params.cityParticipant
	const page = generatePage(params.pageParticipant)

	const [getAllEvents, getAllParticipants, getCities] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
		async () =>
			getParticipants({
				searchParticipant: debounceSearchValue,
				eventId: debounceEventIdValue,
				statusParticipant: debounceStatusValue,
				participantCity: debounceCityValue,
				isInterested: true,
				page,
			}),
		async () => getParticipantsCities(true),
	])

	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			initialPageParam={1}
		>
			<HydrationProvider
				queryFn={getCities}
				queryKey={[QUERY_KEYS.PARTICIPANTS_CITIES, true]}
			>
				<HydrationProvider
					queryFn={getAllParticipants}
					queryKey={[
						QUERY_KEYS.PARTICIPANTS,
						debounceEventIdValue,
						debounceSearchValue,
						debounceStatusValue,
						debounceCityValue,
						true,
						page,
					]}
				>
					<InterestedParticipants />
				</HydrationProvider>
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
