'use client'
import { ChevronUp, UserRoundCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { Avatar, Tooltip } from '@/components/Atoms'
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
			<div className="hs-dropdown relative inline-flex w-full">
				<button
					type="button"
					className={twMerge(
						'hs-tooltip inline-flex w-full shrink-0 items-center gap-x-2 rounded-md p-2 text-start text-sm text-gray-100 [--placement:auto] hover:bg-slate-900/80 focus:outline-hidden',
						collapsed && 'justify-center',
					)}
				>
					<div
						className={twMerge(
							!collapsed ? 'flex w-full items-center gap-2' : 'sr-only',
						)}
					>
						<Avatar>{avatar}</Avatar>
						{user?.name}
						<ChevronUp className="ml-auto" size={20} />
					</div>
					<div className={twMerge(collapsed ? 'block' : 'sr-only')}>
						<Tooltip
							className={
								collapsed
									? 'hs-tooltip-shown:visible'
									: 'hs-tooltip-shown:hidden'
							}
						>
							Usuários
						</Tooltip>
						<UserRoundCog size={24} />
					</div>
				</button>

				<div
					className="hs-dropdown-menu duration hs-dropdown-open:opacity-100 z-20 hidden w-60 rounded-lg border border-gray-200 bg-white opacity-0 shadow-lg transition-[opacity,margin]"
					role="menu"
					aria-orientation="vertical"
				>
					<div className="p-1">
						{user?.role === ROLES.ADMIN && (
							<button
								className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
								onClick={() => push(PRINCIPAL_LINKS.USERS)}
							>
								Gerenciar usuários
							</button>
						)}
						<button
							className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
							onClick={handleLogout}
						>
							Sair
						</button>
					</div>
				</div>
			</div>
		</footer>
	)
})

UserAvatar.displayName = 'UserAvatar'
