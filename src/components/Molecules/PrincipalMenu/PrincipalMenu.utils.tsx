import { FaClipboardUser } from 'react-icons/fa6'
import { GrUserWorker } from 'react-icons/gr'
import { MdEvent, MdOutlineDashboard } from 'react-icons/md'

type BaseMenuLink = {
	buttonLabel: string
	buttonIcon: JSX.Element
}

export type MenuLinkWithHref = BaseMenuLink & {
	hasSubMenu: false
	href: string
}

export type MenuLinkWithSubMenu = BaseMenuLink & {
	hasSubMenu: true
	links: Array<{
		label: string
		href: string
	}>
}

type MENU_LINKS_TYPE = MenuLinkWithHref | MenuLinkWithSubMenu

export const MENU_LINKS: MENU_LINKS_TYPE[] = [
	{
		buttonLabel: 'Dashboard',
		href: '/dashboard',
		buttonIcon: <MdOutlineDashboard size={24} />,
		hasSubMenu: false,
	},
	{
		buttonLabel: 'Eventos',
		href: '/eventos',
		buttonIcon: <MdEvent size={24} />,
		hasSubMenu: false,
	},
	// {
	// 	buttonLabel: 'Funções de voluntários',
	// 	href: '/funcoes_voluntarios',
	// 	icon: <GrUserSettings size={24} />,
	// },
	{
		buttonLabel: 'Participantes',
		buttonIcon: <FaClipboardUser size={24} />,
		hasSubMenu: true,
		links: [
			{ label: 'Listagem', href: '/participantes/listagem' },
			{ label: 'Pagamentos', href: '/participantes/pagamentos' },
			{ label: 'Grupos', href: '/participantes/grupos' },
			{ label: 'Quartos', href: '/participantes/quartos' },
		],
	},
	{
		buttonLabel: 'Voluntários',
		buttonIcon: <GrUserWorker size={24} />,
		hasSubMenu: true,
		links: [
			{ label: 'Listagem', href: '/voluntarios/listagem' },
			{ label: 'Funções', href: '/voluntarios/funcoes' },
			{ label: 'Pagamentos', href: '/voluntarios/pagamentos' },
			{ label: 'Grupos', href: '/voluntarios/grupos' },
			{ label: 'Quartos', href: '/voluntarios/quartos' },
		],
	},
	// {
	// 	label: 'Voluntários',
	// 	href: '/voluntarios',
	// 	icon: <GrUserWorker size={24} />,
	// },
	// { label: 'Grupos', href: '/grupos', icon: <MdOutlineGroups size={24} /> },
	// { label: 'Quartos', href: '/quartos', icon: <MdRoomService size={24} /> },
	// {
	// 	label: 'Pagamentos',
	// 	href: '/pagamentos',
	// 	icon: <MdOutlinePayment size={24} />,
	// },
	// { label: 'Gestão de acesso', href: '#', icon: <PiGearFill size={24} /> },
]
