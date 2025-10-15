import { twMerge } from 'tailwind-merge'

import { Link, Tooltip } from '@/components/Atoms'
import { PAGES_ROLES, type ROLES } from '@/constants'
import type { MenuLinkWithHref } from './PrincipalMenu.utils'

type MenuItemProps = Omit<MenuLinkWithHref, 'hasSubMenu'> & {
	path: string
	collapsed: boolean
	userRole?: ROLES
	width: number | null
}

export const MenuItem = ({
	buttonIcon,
	buttonLabel,
	href,
	collapsed,
	path,
	userRole,
	width,
}: MenuItemProps) => {
	if (
		!PAGES_ROLES[href as keyof typeof PAGES_ROLES].includes(userRole as ROLES)
	) {
		return null
	}
	return (
		<Link
			className={twMerge(
				'hs-tooltip rounded-lg p-2 text-gray-100 transition-colors duration-500 hover:bg-slate-900/80',
				collapsed && 'justify-center gap-x-0',
				path === href && 'bg-slate-900/80',
				width && width < 768 ? '[--placement:bottom]' : '[--placement:right]'
			)}
			href={href}
			key={buttonLabel}
		>
			<Tooltip
				className={
					collapsed ? 'hs-tooltip-shown:visible' : 'hs-tooltip-shown:hidden'
				}
			>
				{buttonLabel}
			</Tooltip>
			{buttonIcon}
			{!collapsed && buttonLabel}
		</Link>
	)
}
