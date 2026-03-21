'use client'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { memo } from 'react'

import { hasPermission, ROUTE_PERMISSIONS } from '@/constants'

import { MenuItem } from './MenuItem'
import { MENU_LINKS } from './PrincipalMenu.utils'
import { SubMenuItem } from './SubMenuItem'

type PrincipalMenuProps = {
	collapsed: boolean
}

export const PrincipalMenu = memo(({ collapsed }: PrincipalMenuProps) => {
	const path = usePathname()
	const { data } = useSession()
	const parsedRoles = JSON.parse(data?.user?.role || '{}')

	const filteredMenuLinks = MENU_LINKS.reduce(
		(acc, link) => {
			if (link.hasSubMenu) {
				const links = link.links.filter((subLink) => {
					const requiredPermission = ROUTE_PERMISSIONS[subLink.href]
					return hasPermission(parsedRoles, requiredPermission)
				})

				if (links.length > 0) {
					acc.push({ ...link, links })
				}
			} else {
				const requiredPermission = ROUTE_PERMISSIONS[link.href]

				if (requiredPermission && hasPermission(parsedRoles, requiredPermission)) {
					acc.push(link)
				}
			}

			return acc
		},
		[] as typeof MENU_LINKS
	)

	return (
		<nav className="flex w-full flex-row justify-evenly md:mt-8 md:flex-col md:space-y-4" data-testid="principal-menu">
			{filteredMenuLinks.map((item) =>
				item.hasSubMenu ? (
					<SubMenuItem {...item} collapsed={collapsed} key={item.buttonLabel} path={path} />
				) : (
					<MenuItem {...item} collapsed={collapsed} key={item.buttonLabel} path={path} />
				)
			)}
		</nav>
	)
})

PrincipalMenu.displayName = 'PrincipalMenu'
