import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { Users } from '@/components/Templates'
import {
	generatePage,
	PAGES_ROLES,
	QUERY_KEYS,
	ROLES,
	validatePagePermission,
} from '@/constants'
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
	const hasPermission = validatePagePermission(
		session?.user?.role as ROLES,
		PAGES_ROLES['/usuarios'],
	)

	if (!hasPermission) {
		return redirect('/dashboard')
	}

	const params = await searchParams.then((res) => ({
		searchUser: res.searchUser ?? '',
		pageUser: res.pageUser ?? '',
	}))
	const debounceValue = params.searchUser
	const page = generatePage(params.pageUser)

	const getAllUsers = async () => getUsers({ searchUser: debounceValue, page })

	return (
		<HydrationProvider
			queryFn={getAllUsers}
			queryKey={[QUERY_KEYS.USERS, debounceValue, page]}
		>
			<Users userId={session?.user?.id as string} />
		</HydrationProvider>
	)
}
