import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { Donation } from '@/components/Templates'
import {
	generatePage,
	PAGES_ROLES,
	QUERY_KEYS,
	ROLES,
	validatePagePermission,
} from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getDonations } from '@/services/queries/donations'
import { getEvents } from '@/services/queries/events'

type SearchParams = {
	searchParams: Promise<{
		eventId?: string
		pageDonation?: string
	}>
}

export default async function DonationPage({ searchParams }: SearchParams) {
	const session = await getServerSession(authOptions)
	const hasPermission = validatePagePermission(
		session?.user?.role as ROLES,
		PAGES_ROLES['/doacoes'],
	)

	if (!hasPermission) {
		return redirect('/dashboard')
	}

	const params = await searchParams.then((res) => ({
		eventId: res.eventId ?? '',
		page: res.pageDonation ?? '',
	}))
	const debounceValue = params.eventId
	const page = generatePage(params.page)

	const [getAllEvents, getAllDonations] = await Promise.all([
		async () => await getEvents({ searchEvent: '', page: 1 }),
		async () => getDonations({ eventId: debounceValue, page }),
	])

	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			initialPageParam={1}
		>
			<HydrationProvider
				queryFn={getAllDonations}
				queryKey={[QUERY_KEYS.DONATIONS, debounceValue, page]}
			>
				<Donation />
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
