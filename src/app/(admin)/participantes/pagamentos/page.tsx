import { ParticipantsPayments } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getParticipants } from '@/services/queries/participants'

export default async function ParticipantsPaymentsPage({
	searchParams,
}: {
	searchParams: {
		searchParticipant: string
		eventId: string
		statusParticipant: string
	}
}) {
	const debounceSearchValue = searchParams.searchParticipant ?? ''
	const debounceEventIdValue = searchParams.eventId ?? ''
	const debounceStatusValue = searchParams.statusParticipant ?? ''
	const [getAllEvents, getAllParticipants] = await Promise.all([
		async () => getEvents({ searchEvent: '' }),
		async () =>
			getParticipants({
				searchParticipant: debounceSearchValue,
				eventId: debounceEventIdValue,
				statusParticipant: debounceStatusValue,
			}),
	])
	return (
		<HydrationProvider
			queryFn={getAllParticipants}
			queryKey={[
				QUERY_KEYS.PARTICIPANTS,
				debounceEventIdValue,
				debounceSearchValue,
				debounceStatusValue,
			]}
		>
			<HydrationProvider
				queryFn={getAllEvents}
				queryKey={[QUERY_KEYS.EVENTS, '']}
			>
				<ParticipantsPayments />
			</HydrationProvider>
		</HydrationProvider>
	)
}
