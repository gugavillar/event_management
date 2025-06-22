'use client'
import { useWindowSize } from '@uidotdev/usehooks'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import {
	ApplicationAvatar,
	PrincipalMenu,
	UserAvatar,
} from '@/components/Molecules'
import { useSidebarContext } from '@/contexts'
import { useCancelPrelineOverflow } from '@/hooks'

export const Sidebar = () => {
	const { collapsed, setCollapsed } = useSidebarContext()
	const { width } = useWindowSize()
	const { data } = useSession()

	useCancelPrelineOverflow()

	useEffect(() => {
		if (width && width <= 1024) {
			setCollapsed(true)
		}
	}, [setCollapsed, width])

	return (
		<aside
			className={twMerge(
				'flex flex-row bg-slate-800 px-4 py-6 transition-[width] duration-500 md:flex-col',
				collapsed ? 'w-20' : 'w-72',
				'max-md:w-full',
			)}
		>
			<ApplicationAvatar collapsed={collapsed} handleCollapse={setCollapsed} />
			<PrincipalMenu collapsed={collapsed} />
			<UserAvatar collapsed={collapsed} user={data?.user} />
		</aside>
	)
}
