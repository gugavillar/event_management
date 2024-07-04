import { FaClipboardUser } from 'react-icons/fa6'
import { GrUserWorker } from 'react-icons/gr'
import {
	MdOutlinePayment,
	MdRoomService,
	MdOutlineDashboard,
	MdOutlineGroups,
} from 'react-icons/md'

import { Link } from '@/components/Atoms'

const MENU_LINKS = [
	{ label: 'Dashboard', href: '#', icon: <MdOutlineDashboard size={24} /> },
	{ label: 'Participantes', href: '#', icon: <FaClipboardUser size={24} /> },
	{ label: 'Voluntários', href: '#', icon: <GrUserWorker size={24} /> },
	{ label: 'Grupos', href: '#', icon: <MdOutlineGroups size={24} /> },
	{ label: 'Quartos', href: '#', icon: <MdRoomService size={24} /> },
	{ label: 'Pagamentos', href: '#', icon: <MdOutlinePayment size={24} /> },
]

export const PrincipalMenu = () => {
	return (
		<section className="mt-12 flex flex-col space-y-6">
			{MENU_LINKS.map((link) => (
				<Link
					key={link.label}
					href={link.href}
					className="rounded-lg p-2 text-gray-100/80 hover:bg-slate-900/30"
				>
					{link.icon}
					{link.label}
				</Link>
			))}
		</section>
	)
}
