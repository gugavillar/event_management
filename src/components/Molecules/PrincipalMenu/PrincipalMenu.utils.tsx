import { FaClipboardUser } from 'react-icons/fa6'
import { GrUserSettings, GrUserWorker } from 'react-icons/gr'
import {
	MdEvent,
	MdOutlineDashboard,
	MdOutlineGroups,
	MdOutlinePayment,
	MdRoomService,
} from 'react-icons/md'
import { PiGearFill } from 'react-icons/pi'

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
