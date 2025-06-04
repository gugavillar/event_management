import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { Sidebar } from '@/components/Organisms'
import { PRINCIPAL_LINKS } from '@/constants'
import { SessionProvider } from '@/providers/SessionProvider'

import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authOptions)

	if (!session?.user || session.user.firstAccess) {
		redirect(PRINCIPAL_LINKS.LOGIN)
	}

	return (
		<SessionProvider session={session}>
			<main className="grid h-full grid-cols-1 md:grid-cols-admin">
				<Sidebar />
				<div className="bg-slate-100/50 max-md:h-[calc(100dvh-5.5rem)] md:overflow-y-auto">
					{children}
				</div>
			</main>
		</SessionProvider>
	)
}
