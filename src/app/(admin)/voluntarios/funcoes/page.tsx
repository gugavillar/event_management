import { VolunteersFunctions } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getFunctions } from '@/services/queries/volunteers'

type SearchParams = {
	searchParams: Promise<{
		searchFunction?: string
	}>
}

export default async function VolunteersFunctionsPage({
	searchParams,
}: SearchParams) {
	const params = await searchParams.then((res) => ({
		searchFunction: res.searchFunction ?? '',
	}))
	const debounceValue = params.searchFunction

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
