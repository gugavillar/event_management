'use client'
import { ChevronUp, UserRoundCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { Avatar, Dropdown, DropdownItem, Tooltip } from '@/components/Atoms'
import { PRINCIPAL_LINKS, ROLES } from '@/constants'

type UserAvatarProps = {
	collapsed: boolean
	user?: User
}

export const UserAvatar = memo(({ collapsed, user }: UserAvatarProps) => {
	const avatar = user?.name ?? 'Usuário'
	const { push } = useRouter()

	const handleLogout = async () => {
		await signOut({
			callbackUrl: PRINCIPAL_LINKS.LOGIN,
			redirect: true,
		})
	}

	return (
		<footer className="border-gray-200 max-md:border-l max-md:pl-4 md:mt-auto md:border-t md:pt-4">
			<Dropdown
				trigger={
					<button
						className={twMerge(
							'inline-flex shrink-0 cursor-pointer items-center gap-x-2 rounded-md p-2 text-start text-sm text-gray-100 hover:bg-slate-900/80 focus:outline-hidden',
							collapsed && 'justify-center'
						)}
						type="button"
					>
						<div className={twMerge(!collapsed ? 'flex w-full items-center gap-2' : 'sr-only')}>
							<Avatar>{avatar}</Avatar>
							{user?.name}
							<ChevronUp className="ml-auto" size={20} />
						</div>
						<div className={twMerge(collapsed ? 'block' : 'sr-only')}>
							<Tooltip trigger={<UserRoundCog size={24} />}>Usuários</Tooltip>
						</div>
					</button>
				}
			>
				{user?.role === ROLES.ADMIN && (
					<DropdownItem>
						<button
							className="flex w-full cursor-pointer items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
							onSelect={() => push(PRINCIPAL_LINKS.USERS)}
						>
							Gerenciar usuários
						</button>
					</DropdownItem>
				)}
				<DropdownItem>
					<button
						className="flex w-full cursor-pointer items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
						onSelect={handleLogout}
					>
						Sair
					</button>
				</DropdownItem>
			</Dropdown>
		</footer>
	)
})

UserAvatar.displayName = 'UserAvatar'
