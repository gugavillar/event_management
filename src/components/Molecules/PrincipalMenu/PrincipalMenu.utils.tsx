import {
	BriefcaseBusiness,
	Calendar,
	CircleUserRound,
	Gauge,
} from 'lucide-react'

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
		buttonIcon: <Gauge size={24} />,
		hasSubMenu: false,
	},
	{
		buttonLabel: 'Eventos',
		href: '/eventos',
		buttonIcon: <Calendar size={24} />,
		hasSubMenu: false,
	},
	{
		buttonLabel: 'Participantes',
		buttonIcon: <CircleUserRound size={24} />,
		hasSubMenu: true,
		links: [
			{ label: 'Listagem', href: '/participantes/listagem' },
			{ label: 'Pagamentos', href: '/participantes/pagamentos' },
			// { label: 'Grupos', href: '/participantes/grupos' },
			// { label: 'Quartos', href: '/participantes/quartos' },
		],
	},
	{
		buttonLabel: 'Voluntários',
		buttonIcon: <BriefcaseBusiness size={24} />,
		hasSubMenu: true,
		links: [
			{ label: 'Listagem', href: '/voluntarios/listagem' },
			{ label: 'Funções', href: '/voluntarios/funcoes' },
			{ label: 'Pagamentos', href: '/voluntarios/pagamentos' },
			// { label: 'Grupos', href: '/voluntarios/grupos' },
			// { label: 'Quartos', href: '/voluntarios/quartos' },
		],
	},
]
