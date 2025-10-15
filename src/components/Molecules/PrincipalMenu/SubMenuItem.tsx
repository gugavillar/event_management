import { isServer } from '@tanstack/react-query'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { Link, Tooltip } from '@/components/Atoms'
import { PAGES_ROLES, type ROLES } from '@/constants'

import type { MenuLinkWithSubMenu } from './PrincipalMenu.utils'

type SubMenuItemProps = Omit<MenuLinkWithSubMenu, 'hasSubMenu'> & {
	collapsed: boolean
	path: string
	userRole?: string
	width: number | null
}

const validateHasMenu = (links: MenuLinkWithSubMenu['links'], userRole: ROLES) => {
	return links.some((link) => PAGES_ROLES[link.href as keyof typeof PAGES_ROLES].includes(userRole))
}

export const SubMenuItem = ({ buttonIcon, buttonLabel, collapsed, links, path, userRole, width }: SubMenuItemProps) => {
	const validateLabelPath = buttonLabel
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()

	useEffect(() => {
		const load = async () => {
			if (isServer) return

			const { HSDropdown } = await import('preline/preline')
			HSDropdown.autoInit()
		}
		load()
	}, [])

	if (!validateHasMenu(links, userRole as ROLES)) {
		return null
	}

	return (
		<div className="hs-dropdown relative inline-flex">
			<button
				className={twMerge(
					'hs-tooltip inline-flex w-full shrink-0 cursor-pointer items-center gap-x-2 rounded-md p-2 text-start text-lg font-medium text-gray-100 hover:bg-slate-900/80 focus:outline-hidden',
					collapsed && 'justify-center',
					path.includes(validateLabelPath) && 'bg-slate-900/80',
					width && width < 768 ? '[--placement:bottom]' : '[--placement:right]'
				)}
				type="button"
			>
				<Tooltip className={collapsed ? 'hs-tooltip-shown:visible' : 'hs-tooltip-shown:hidden'}>{buttonLabel}</Tooltip>
				{buttonIcon}
				{!collapsed && buttonLabel}
			</button>

			<div
				aria-orientation="vertical"
				className="hs-dropdown-menu duration hs-dropdown-open:opacity-100 z-20 hidden w-60 rounded-lg border border-gray-200 bg-white opacity-0 shadow-lg transition-[opacity,margin]"
				role="menu"
			>
				<div className="p-1">
					{links.map(({ href, label }) => {
						if (!PAGES_ROLES[href as keyof typeof PAGES_ROLES].includes(userRole as ROLES)) {
							return null
						}
						return (
							<Link
								className="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
								href={href}
								key={label}
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
