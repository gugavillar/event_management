'use client'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Header } from '@/components/Atoms'

type HeaderPageProps = ComponentProps<'section'> & {
	pageTitle?: string
}

export const HeaderPage = ({ className, children, pageTitle, ...props }: HeaderPageProps) => {
	const path = usePathname()

	const title = pageTitle ?? path.replace('/', '')

	return (
		<section className={twMerge('flex w-full flex-col bg-slate-800/5 p-8', className)} {...props}>
			<Header className="first-letter:uppercase">{title}</Header>
			{children}
		</section>
	)
}
