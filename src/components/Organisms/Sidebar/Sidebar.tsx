'use client'
import { useSession } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'

import {
	ApplicationAvatar,
	PrincipalMenu,
	UserAvatar,
} from '@/components/Molecules'
import { useSidebarContext } from '@/contexts'

export const Sidebar = () => {
	const { collapsed, setCollapsed } = useSidebarContext()
	const { data } = useSession()

	return (
		<aside
			className={twMerge(
				'flex flex-col bg-slate-800 px-4 py-6 transition-[width] duration-500',
				collapsed ? 'w-20' : 'w-72',
			)}
		>
			<ApplicationAvatar collapsed={collapsed} handleCollapse={setCollapsed} />
			<PrincipalMenu collapsed={collapsed} />
			<UserAvatar collapsed={collapsed} user={data?.user} />
		</aside>
	)
}
