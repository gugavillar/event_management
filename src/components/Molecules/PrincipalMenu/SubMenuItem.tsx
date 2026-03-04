'use client'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { Dropdown, DropdownItem, Tooltip } from '@/components/Atoms'
import { PAGES_ROLES, type ROLES } from '@/constants'

import type { MenuLinkWithSubMenu } from './PrincipalMenu.utils'

type SubMenuItemProps = Omit<MenuLinkWithSubMenu, 'hasSubMenu'> & {
	collapsed: boolean
	path: string
	userRole?: string
}

const validateHasMenu = (links: MenuLinkWithSubMenu['links'], userRole: ROLES) => {
	return links.some((link) => PAGES_ROLES[link.href as keyof typeof PAGES_ROLES].includes(userRole))
}

export const SubMenuItem = ({ buttonIcon, buttonLabel, collapsed, links, path, userRole }: SubMenuItemProps) => {
	const { push } = useRouter()
	const validateLabelPath = buttonLabel
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()

	if (!validateHasMenu(links, userRole as ROLES)) {
		return null
	}

	return (
		<Dropdown
			trigger={
				<button
					className={twMerge(
						'inline-flex shrink-0 cursor-pointer items-center gap-x-2 rounded-md p-2 text-start font-medium text-gray-100 text-lg hover:bg-slate-900/80 focus:outline-hidden',
						collapsed && 'justify-center',
						path.includes(validateLabelPath) && 'bg-slate-900/80'
					)}
					type="button"
				>
					{collapsed ? <Tooltip trigger={buttonIcon}>{buttonLabel}</Tooltip> : buttonIcon}
					{!collapsed && buttonLabel}
				</button>
			}
		>
			{links.map(({ href, label }) => {
				if (!PAGES_ROLES[href as keyof typeof PAGES_ROLES].includes(userRole as ROLES)) {
					return null
				}
				return (
					<DropdownItem key={label} onSelect={() => push(href)}>
						<button className="flex w-full cursor-pointer items-center gap-x-3 rounded-lg px-3 py-2 text-gray-800 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50">
							{label}
						</button>
					</DropdownItem>
				)
			})}
		</Dropdown>
	)
}
