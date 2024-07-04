import { ReactNode } from 'react'

export default function AdminLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<main className="grid h-full grid-cols-1 md:grid-cols-admin">
			<aside>menu</aside>
			<div className="md:overflow-y-auto">{children}</div>
		</main>
	)
}
