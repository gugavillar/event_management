import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { Sidebar } from '@/components/Organisms'
import { PRINCIPAL_LINKS } from '@/constants'
import { AuthGuard } from '@/providers/AuthGuard'
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
			<AuthGuard>
				<main className="grid h-full grid-cols-1 md:grid-cols-[auto_1fr]">
					<Sidebar />
					<div className="overflow-y-auto bg-slate-100/50 max-md:h-[calc(100dvh-5.5rem)]">
						{children}
					</div>
				</main>
			</AuthGuard>
		</SessionProvider>
	)
}
