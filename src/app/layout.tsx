import type { Metadata } from 'next'

import { Providers } from '@/providers/Providers'
import { roboto } from '@/theme'

import './globals.css'

export const metadata: Metadata = {
	title: 'Gerenciador de eventos - Anglicana Vida',
	description: 'Gerenciador de eventos da igreja anglicana vida',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`flex h-dvh w-full flex-col overflow-x-clip md:overflow-y-hidden ${roboto.className}`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
