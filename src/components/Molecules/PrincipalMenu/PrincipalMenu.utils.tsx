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
import type { ReactElement } from 'react'

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
		buttonIcon: <Gauge size={24} />,
		buttonLabel: 'Dashboard',
		hasSubMenu: false,
		href: '/dashboard',
	},
	{
		buttonIcon: <Calendar size={24} />,
		buttonLabel: 'Eventos',
		hasSubMenu: false,
		href: '/eventos',
	},
	{
		buttonIcon: <CircleUserRound size={24} />,
		buttonLabel: 'Participantes',
		hasSubMenu: true,
		links: [
			{ href: '/participantes/listagem', label: 'Listagem' },
			{
				href: '/participantes/lista-interessados',
				label: 'Lista de interessados',
			},
			{ href: '/participantes/pagamentos', label: 'Pagamentos' },
		],
	},
	{
		buttonIcon: <BriefcaseBusiness size={24} />,
		buttonLabel: 'Voluntários',
		hasSubMenu: true,
		links: [
			{ href: '/voluntarios/listagem', label: 'Listagem' },
			{ href: '/voluntarios/funcoes', label: 'Funções' },
			{ href: '/voluntarios/pagamentos', label: 'Pagamentos' },
		],
	},
	{
		buttonIcon: <UsersRound size={24} />,
		buttonLabel: 'Grupos',
		hasSubMenu: false,
		href: '/grupos',
	},
	{
		buttonIcon: <ConciergeBell size={24} />,
		buttonLabel: 'Quartos',
		hasSubMenu: false,
		href: '/quartos',
	},
	{
		buttonIcon: <Speech size={24} />,
		buttonLabel: 'Reuniões',
		hasSubMenu: false,
		href: '/reunioes',
	},
	{
		buttonIcon: <HandHeart size={24} />,
		buttonLabel: 'Doações',
		hasSubMenu: false,
		href: '/doacoes',
	},
	{
		buttonIcon: <Landmark size={24} />,
		buttonLabel: 'Transações',
		hasSubMenu: false,
		href: '/transacoes',
	},
]
