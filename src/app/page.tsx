import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { Login } from '@/components/Templates'

import { authOptions } from './api/auth/[...nextauth]/authOptions'

export default async function LoginPage() {
	const session = await getServerSession(authOptions)

	if (session?.user) {
		redirect('/dashboard')
	}

	return <Login />
}
