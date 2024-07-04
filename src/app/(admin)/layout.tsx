import { ReactNode } from 'react'

import { Sidebar } from '@/components/Organisms'

export default function AdminLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<main className="grid h-full grid-cols-1 md:grid-cols-admin">
			<Sidebar />
			<div className="md:overflow-y-auto">{children}</div>
		</main>
	)
}
