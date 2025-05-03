'use client'
import { usePathname } from 'next/navigation'

import { MenuItem } from './MenuItem'
import { MENU_LINKS } from './PrincipalMenu.utils'
import { SubMenuItem } from './SubMenuItem'

type PrincipalMenuProps = {
	collapsed: boolean
}

export const PrincipalMenu = ({ collapsed }: PrincipalMenuProps) => {
	const path = usePathname()
	return (
		<nav className="mt-8 flex flex-col space-y-4" data-testid="principal-menu">
			{MENU_LINKS.map((item) =>
				item.hasSubMenu ? (
					<SubMenuItem
						{...item}
						path={path}
						key={item.buttonLabel}
						collapsed={collapsed}
					/>
				) : (
					<MenuItem
						{...item}
						path={path}
						key={item.buttonLabel}
						collapsed={collapsed}
					/>
				),
			)}
		</nav>
	)
}
