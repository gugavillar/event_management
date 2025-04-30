'use client'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { Link, Tooltip } from '@/components/Atoms'

import { MENU_LINKS } from './PrincipalMenu.utils'

type PrincipalMenuProps = {
	collapsed: boolean
}

export const PrincipalMenu = ({ collapsed }: PrincipalMenuProps) => {
	const path = usePathname()
	return (
		<section
			className="mt-8 flex flex-col space-y-4"
			data-testid="principal-menu"
		>
			{MENU_LINKS.map((link) => (
				<Link
					key={link.label}
					href={link.href}
					className={twMerge(
						'hs-tooltip rounded-lg p-2 text-gray-100 transition-colors duration-500 [--placement:right] hover:bg-slate-900/80',
						collapsed && 'justify-center gap-x-0',
						path === link.href && 'bg-slate-900/80',
					)}
				>
					<Tooltip
						className={
							collapsed ? 'hs-tooltip-shown:visible' : 'hs-tooltip-shown:hidden'
						}
					>
						{link.label}
					</Tooltip>
					{link.icon}
					{!collapsed && link.label}
				</Link>
			))}
		</section>
	)
}
