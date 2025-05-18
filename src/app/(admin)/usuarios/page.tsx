import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { Users } from '@/components/Templates'
import { generatePage, QUERY_KEYS, ROLES } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getUsers } from '@/services/queries/users'

export default async function UsersPage({
	searchParams,
}: {
	searchParams: { searchUser: string; pageUser: string }
}) {
	const debounceValue = searchParams.searchUser ?? ''
	const page = generatePage(searchParams.pageUser)

	const getAllUsers = async () => getUsers({ searchUser: debounceValue, page })
	const session = await getServerSession(authOptions)

	if (session?.user?.role !== ROLES.ADMIN) {
		redirect('/dashboard')
	}

	return (
		<HydrationProvider
			queryFn={getAllUsers}
			queryKey={[QUERY_KEYS.USERS, debounceValue, page]}
		>
			<Users />
		</HydrationProvider>
	)
}
