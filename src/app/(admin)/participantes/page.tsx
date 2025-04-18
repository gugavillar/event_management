import { Participants } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getParticipants } from '@/services/queries/participants'

export default async function ParticipantsPage() {
	const [getAllEvents, getAllParticipants] = await Promise.all([
		async () => getEvents({ search: '' }),
		async () => getParticipants({ eventId: '' }),
	])

	return (
		<HydrationProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS, '']}
		>
			<HydrationProvider
				queryFn={getAllParticipants}
				queryKey={[QUERY_KEYS.PARTICIPANTS, '', '']}
			>
				<Participants />
			</HydrationProvider>
		</HydrationProvider>
	)
}
