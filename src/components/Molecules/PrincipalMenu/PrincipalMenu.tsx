import { FaClipboardUser } from 'react-icons/fa6'
import { GrUserWorker, GrUserSettings } from 'react-icons/gr'
import {
	MdOutlinePayment,
	MdRoomService,
	MdOutlineDashboard,
	MdOutlineGroups,
	MdEvent,
} from 'react-icons/md'

import { Link } from '@/components/Atoms'

const MENU_LINKS = [
	{ label: 'Dashboard', href: '#', icon: <MdOutlineDashboard size={24} /> },
	{ label: 'Eventos', href: '#', icon: <MdEvent size={24} /> },
	{ label: 'Participantes', href: '#', icon: <FaClipboardUser size={24} /> },
	{ label: 'Voluntários', href: '#', icon: <GrUserWorker size={24} /> },
	{ label: 'Grupos', href: '#', icon: <MdOutlineGroups size={24} /> },
	{ label: 'Quartos', href: '#', icon: <MdRoomService size={24} /> },
	{ label: 'Pagamentos', href: '#', icon: <MdOutlinePayment size={24} /> },
	{ label: 'Gestão de acesso', href: '#', icon: <GrUserSettings size={24} /> },
] as const

export const PrincipalMenu = () => {
	return (
		<section
			className="mt-8 flex flex-col space-y-4"
			data-testid="principal-menu"
		>
			{MENU_LINKS.map((link) => (
				<Link
					key={link.label}
					href={link.href}
					className="rounded-lg p-2 text-gray-100 transition-colors duration-500 hover:bg-slate-900/80"
				>
					{link.icon}
					{link.label}
				</Link>
			))}
		</section>
	)
}
