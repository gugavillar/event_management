import { Participants } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getParticipants } from '@/services/queries/participants'

type SearchParams = {
	searchParams: Promise<{
		searchParticipant?: string
		eventId?: string
		statusParticipant?: string
		pageParticipant?: string
	}>
}

export default async function ParticipantsPage({ searchParams }: SearchParams) {
	const params = await searchParams.then((res) => ({
		searchParticipant: res.searchParticipant ?? '',
		eventId: res.eventId ?? '',
		statusParticipant: res.statusParticipant ?? '',
		pageParticipant: res.pageParticipant ?? '',
	}))
	const debounceSearchValue = params.searchParticipant
	const debounceEventIdValue = params.eventId
	const debounceStatusValue = params.statusParticipant
	const page = generatePage(params.pageParticipant)

	const [getAllEvents, getAllParticipants] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
		async () =>
			getParticipants({
				searchParticipant: debounceSearchValue,
				eventId: debounceEventIdValue,
				statusParticipant: debounceStatusValue,
				page,
			}),
	])

	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			initialPageParam={1}
		>
			<HydrationProvider
				queryFn={getAllParticipants}
				queryKey={[
					QUERY_KEYS.PARTICIPANTS,
					debounceEventIdValue,
					debounceSearchValue,
					debounceStatusValue,
					page,
				]}
			>
				<Participants />
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
