import { twMerge } from 'tailwind-merge'

import { Link, Tooltip } from '@/components/Atoms'

import { MenuLinkWithSubMenu } from './PrincipalMenu.utils'

type SubMenuItemProps = Omit<MenuLinkWithSubMenu, 'hasSubMenu'> & {
	collapsed: boolean
	path: string
}

export const SubMenuItem = ({
	buttonIcon,
	buttonLabel,
	collapsed,
	links,
	path,
}: SubMenuItemProps) => {
	const validateLabelPath = buttonLabel
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()

	return (
		<div className="hs-dropdown relative inline-flex [--strategy:absolute]">
			<button
				type="button"
				className={twMerge(
					'hs-tooltip focus:outline-hidden inline-flex w-full shrink-0 items-center gap-x-2 rounded-md p-2 text-start text-lg font-medium text-gray-100 hover:bg-slate-900/80',
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
				className="hs-dropdown-menu duration z-20 hidden w-60 rounded-lg border border-gray-200 bg-white opacity-0 shadow-lg transition-[opacity,margin] hs-dropdown-open:opacity-100"
				role="menu"
				aria-orientation="vertical"
			>
				<div className="p-1">
					{links.map(({ href, label }) => (
						<Link
							key={label}
							className="focus:outline-hidden flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
							href={href}
						>
							{label}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
