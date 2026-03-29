'use client'

import { XCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { ReactNode } from 'react'
import toast, { ToastBar, Toaster } from 'react-hot-toast'

import { QueryProvider } from './QueryProvider'

const SidebarProvider = dynamic(() => import('@/contexts').then((mod) => mod.SidebarProvider), { ssr: false })

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
			>
				{(t) => (
					<ToastBar toast={t}>
						{({ icon, message }) => (
							<div className="relative flex w-full items-center gap-3">
								{icon}
								<div className="flex-1">{message}</div>
								<button
									className="absolute -top-3.5 -right-3.5 cursor-pointer text-gray-500"
									onClick={() => toast.dismiss(t.id)}
								>
									<XCircle className="size-5" />
								</button>
							</div>
						)}
					</ToastBar>
				)}
			</Toaster>
		</SidebarProvider>
	)
}
