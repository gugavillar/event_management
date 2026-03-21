import { twMerge } from 'tailwind-merge'

import { Link, Tooltip } from '@/components/Atoms'

import type { MenuLinkWithHref } from './PrincipalMenu.utils'

type MenuItemProps = Omit<MenuLinkWithHref, 'hasSubMenu'> & {
	path: string
	collapsed: boolean
}

export const MenuItem = ({ buttonIcon, buttonLabel, href, collapsed, path }: MenuItemProps) => {
	return (
		<Link
			className={twMerge(
				'rounded-lg p-2 text-gray-100 transition-colors duration-500 hover:bg-slate-900/80',
				collapsed && 'justify-center gap-x-0',
				path === href && 'bg-slate-900/80'
			)}
			href={href}
			key={buttonLabel}
		>
			{collapsed ? <Tooltip trigger={buttonIcon}>{buttonLabel}</Tooltip> : buttonIcon}
			{!collapsed && buttonLabel}
		</Link>
	)
}
