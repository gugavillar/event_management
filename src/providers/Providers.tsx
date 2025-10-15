'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import PrelineScriptWrapper from '@/loaders/PrelineWrapper'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { QueryProvider } from './QueryProvider'

const SidebarProvider = dynamic(
	() => import('@/contexts').then((mod) => mod.SidebarProvider),
	{ ssr: false }
)

export const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
	return (
		<SidebarProvider>
			<NuqsAdapter>
				<QueryProvider>{children}</QueryProvider>
			</NuqsAdapter>
			<Toaster
				position="top-right"
				toastOptions={{
					className: 'w-full !p-4 font-semibold',
					duration: 5000,
					style: {
						maxWidth: '25rem',
					},
				}}
			/>
			<PrelineScriptWrapper />
		</SidebarProvider>
	)
}
