'use client'

import dynamic from 'next/dynamic'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import PrelineScript from '@/loaders/Preline'

import { QueryProvider } from './QueryProvider'

const SidebarProvider = dynamic(
	() => import('@/contexts').then((mod) => mod.SidebarProvider),
	{ ssr: false },
)

export const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
	return (
		<SidebarProvider>
			<NuqsAdapter>
				<QueryProvider>{children}</QueryProvider>
			</NuqsAdapter>
			<Toaster position="top-right" toastOptions={{ duration: 3000 }} />
			<PrelineScript />
		</SidebarProvider>
	)
}
