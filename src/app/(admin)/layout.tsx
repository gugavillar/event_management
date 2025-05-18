import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { Sidebar } from '@/components/Organisms'
import { SessionProvider } from '@/providers/SessionProvider'

import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authOptions)

	if (!session?.user) {
		redirect('/')
	}

	return (
		<SessionProvider session={session}>
			<main className="grid h-full grid-cols-1 md:grid-cols-admin">
				<Sidebar />
				<div className="bg-slate-100/50 md:overflow-y-auto">{children}</div>
			</main>
		</SessionProvider>
	)
}
