import { twMerge } from 'tailwind-merge'

import { Link, Tooltip } from '@/components/Atoms'

import { MenuLinkWithHref } from './PrincipalMenu.utils'

type MenuItemProps = Omit<MenuLinkWithHref, 'hasSubMenu'> & {
	path: string
	collapsed: boolean
}

export const MenuItem = ({
	buttonIcon,
	buttonLabel,
	href,
	collapsed,
	path,
}: MenuItemProps) => {
	return (
		<Link
			key={buttonLabel}
			href={href}
			className={twMerge(
				'hs-tooltip rounded-lg p-2 text-gray-100 transition-colors duration-500 [--placement:right] hover:bg-slate-900/80',
				collapsed && 'justify-center gap-x-0',
				path === href && 'bg-slate-900/80',
			)}
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
