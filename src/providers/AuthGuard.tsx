'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { PRINCIPAL_LINKS } from '@/constants'
import { signOut, useSession } from 'next-auth/react'

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
