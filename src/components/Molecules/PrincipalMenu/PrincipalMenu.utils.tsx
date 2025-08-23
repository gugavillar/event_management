import {
	BriefcaseBusiness,
	Calendar,
	CircleUserRound,
	ConciergeBell,
	Gauge,
	HandHeart,
	Landmark,
	Speech,
	UsersRound,
} from 'lucide-react'
import { ReactElement } from 'react'

type BaseMenuLink = {
	buttonLabel: string
	buttonIcon: ReactElement
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
			{
				label: 'Lista de interessados',
				href: '/participantes/lista-interessados',
			},
			{ label: 'Pagamentos', href: '/participantes/pagamentos' },
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
		],
	},
	{
		buttonLabel: 'Grupos',
		href: '/grupos',
		buttonIcon: <UsersRound size={24} />,
		hasSubMenu: false,
	},
	{
		buttonLabel: 'Quartos',
		href: '/quartos',
		buttonIcon: <ConciergeBell size={24} />,
		hasSubMenu: false,
	},
	{
		buttonLabel: 'Reuniões',
		buttonIcon: <Speech size={24} />,
		hasSubMenu: false,
		href: '/reunioes',
	},
	{
		buttonLabel: 'Doações',
		buttonIcon: <HandHeart size={24} />,
		hasSubMenu: false,
		href: '/doacoes',
	},
	{
		buttonLabel: 'Pagamentos',
		buttonIcon: <Landmark size={24} />,
		hasSubMenu: false,
		href: '/transacoes',
	},
]
