'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import { SidebarProvider } from '@/contexts'
import PrelineScript from '@/loaders/Preline'

import { QueryProvider } from './QueryProvider'

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
