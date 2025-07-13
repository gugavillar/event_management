'use client'

import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'

import { PRINCIPAL_LINKS } from '@/constants'

export function AuthGuard({ children }: { children: React.ReactNode }) {
	const { status } = useSession()
	const pathname = usePathname()

	useEffect(() => {
		if (status === 'unauthenticated') {
			signOut({ callbackUrl: PRINCIPAL_LINKS.LOGIN })
		}
	}, [status, pathname])

	return <>{children}</>
}
