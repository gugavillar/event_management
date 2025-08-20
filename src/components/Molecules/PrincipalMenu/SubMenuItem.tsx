import { twMerge } from 'tailwind-merge'

import { Link, Tooltip } from '@/components/Atoms'
import { PAGES_ROLES, ROLES } from '@/constants'

import { MenuLinkWithSubMenu } from './PrincipalMenu.utils'

type SubMenuItemProps = Omit<MenuLinkWithSubMenu, 'hasSubMenu'> & {
	collapsed: boolean
	path: string
	userRole?: string
}

const validateHasMenu = (
	links: MenuLinkWithSubMenu['links'],
	userRole: ROLES,
) => {
	return links.some((link) =>
		PAGES_ROLES[link.href as keyof typeof PAGES_ROLES].includes(userRole),
	)
}

export const SubMenuItem = ({
	buttonIcon,
	buttonLabel,
	collapsed,
	links,
	path,
	userRole,
}: SubMenuItemProps) => {
	const validateLabelPath = buttonLabel
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()

	if (!validateHasMenu(links, userRole as ROLES)) {
		return null
	}

	return (
		<div className="hs-dropdown relative inline-flex">
			<button
				type="button"
				className={twMerge(
					'hs-tooltip inline-flex w-full shrink-0 items-center gap-x-2 rounded-md p-2 text-start text-lg font-medium text-gray-100 [--placement:auto] hover:bg-slate-900/80 focus:outline-hidden',
					collapsed && 'justify-center',
					path.includes(validateLabelPath) && 'bg-slate-900/80',
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
			</button>

			<div
				className="hs-dropdown-menu duration hs-dropdown-open:opacity-100 z-20 hidden w-60 rounded-lg border border-gray-200 bg-white opacity-0 shadow-lg transition-[opacity,margin]"
				role="menu"
				aria-orientation="vertical"
			>
				<div className="p-1">
					{links.map(({ href, label }) => {
						if (
							!PAGES_ROLES[href as keyof typeof PAGES_ROLES].includes(
								userRole as ROLES,
							)
						) {
							return null
						}
						return (
							<Link
								key={label}
								className="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
								href={href}
							>
								{label}
							</Link>
						)
					})}
				</div>
			</div>
		</div>
	)
}
