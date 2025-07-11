'use client'
import { usePathname } from 'next/navigation'
import { memo } from 'react'

import { MenuItem } from './MenuItem'
import { MENU_LINKS } from './PrincipalMenu.utils'
import { SubMenuItem } from './SubMenuItem'

type PrincipalMenuProps = {
	collapsed: boolean
}

export const PrincipalMenu = memo(({ collapsed }: PrincipalMenuProps) => {
	const path = usePathname()
	return (
		<nav
			className="flex w-full flex-row justify-evenly md:mt-8 md:flex-col md:space-y-4"
			data-testid="principal-menu"
		>
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
})

PrincipalMenu.displayName = 'PrincipalMenu'
