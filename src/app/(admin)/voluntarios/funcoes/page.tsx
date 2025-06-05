import { VolunteersFunctions } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getFunctions } from '@/services/queries/volunteers'

export default async function VolunteersFunctionsPage({
	searchParams,
}: {
	searchParams: { searchFunction: string }
}) {
	const debounceValue = searchParams.searchFunction ?? ''

	const getAllFunctions = async () =>
		getFunctions({ searchFunction: debounceValue })

	return (
		<HydrationProvider
			queryFn={getAllFunctions}
			queryKey={[QUERY_KEYS.VOLUNTEERS_FUNCTIONS, debounceValue]}
		>
			<VolunteersFunctions />
		</HydrationProvider>
	)
}
