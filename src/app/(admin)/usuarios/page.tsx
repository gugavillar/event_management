import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { Users } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getUsers } from '@/services/queries/users'

type SearchParams = {
	searchParams: Promise<{
		searchUser?: string
		pageUser?: string
	}>
}

export default async function UsersPage({ searchParams }: SearchParams) {
	const session = await getServerSession(authOptions)
	const params = await searchParams.then((res) => ({
		pageUser: res.pageUser ?? '',
		searchUser: res.searchUser ?? '',
	}))
	const debounceValue = params.searchUser
	const page = generatePage(params.pageUser)

	const getAllUsers = () => getUsers({ page, searchUser: debounceValue })

	return (
		<HydrationProvider
			queryFn={getAllUsers}
			queryKey={[QUERY_KEYS.USERS, debounceValue, page]}
		>
			<Users userId={session?.user?.id as string} />
		</HydrationProvider>
	)
}
