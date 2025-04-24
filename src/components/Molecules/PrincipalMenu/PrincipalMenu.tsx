'use client'
import { usePathname } from 'next/navigation'
import { FaClipboardUser } from 'react-icons/fa6'
import { GrUserWorker, GrUserSettings } from 'react-icons/gr'
import {
	MdOutlinePayment,
	MdRoomService,
	MdOutlineDashboard,
	MdOutlineGroups,
	MdEvent,
} from 'react-icons/md'
import { PiGearFill } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'

import { Link, Tooltip } from '@/components/Atoms'

type PrincipalMenuProps = {
	collapsed: boolean
}

export const MENU_LINKS = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		icon: <MdOutlineDashboard size={24} />,
	},
	{ label: 'Eventos', href: '/eventos', icon: <MdEvent size={24} /> },
	{
		label: 'Funções de voluntários',
		href: '/funcoes_voluntarios',
		icon: <GrUserSettings size={24} />,
	},
	{
		label: 'Participantes',
		href: '/participantes',
		icon: <FaClipboardUser size={24} />,
	},
	{
		label: 'Voluntários',
		href: '/voluntarios',
		icon: <GrUserWorker size={24} />,
	},
	{ label: 'Grupos', href: '/grupos', icon: <MdOutlineGroups size={24} /> },
	{ label: 'Quartos', href: '/quartos', icon: <MdRoomService size={24} /> },
	{
		label: 'Pagamentos',
		href: '/pagamentos',
		icon: <MdOutlinePayment size={24} />,
	},
	{ label: 'Gestão de acesso', href: '#', icon: <PiGearFill size={24} /> },
] as const

export const PrincipalMenu = ({ collapsed }: PrincipalMenuProps) => {
	const path = usePathname()

	return (
		<section
			className="mt-8 flex flex-col space-y-4"
			data-testid="principal-menu"
		>
			{MENU_LINKS.map((link) => (
				<Link
					key={link.label}
					href={link.href}
					className={twMerge(
						'hs-tooltip rounded-lg p-2 text-gray-100 transition-colors duration-500 [--placement:right] hover:bg-slate-900/80',
						collapsed && 'justify-center gap-x-0',
						path === link.href && 'bg-slate-900/80',
					)}
				>
					<Tooltip
						className={
							collapsed ? 'hs-tooltip-shown:visible' : 'hs-tooltip-shown:hidden'
						}
					>
						{link.label}
					</Tooltip>
					{link.icon}
					{!collapsed && link.label}
				</Link>
			))}
		</section>
	)
}
