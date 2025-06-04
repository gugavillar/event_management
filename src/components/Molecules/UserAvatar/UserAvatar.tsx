'use client'
import { ChevronUp, UserRoundCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import { Fragment, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { Avatar } from '@/components/Atoms'
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
			<div className="hs-dropdown relative inline-flex w-full [--strategy:absolute]">
				<button
					type="button"
					className={twMerge(
						'focus:outline-hidden inline-flex w-full shrink-0 items-center gap-x-2 rounded-md p-2 text-start text-sm text-gray-100 hover:bg-slate-900/80',
						collapsed && 'justify-center',
					)}
				>
					{!collapsed ? (
						<Fragment>
							<Avatar>{avatar}</Avatar>
							{user?.name}
							<ChevronUp className="ml-auto" size={20} />
						</Fragment>
					) : (
						<UserRoundCog size={24} />
					)}
				</button>

				<div
					className="hs-dropdown-menu duration z-20 hidden w-60 rounded-lg border border-gray-200 bg-white opacity-0 shadow-lg transition-[opacity,margin] hs-dropdown-open:opacity-100"
					role="menu"
					aria-orientation="vertical"
				>
					<div className="p-1">
						{user?.role === ROLES.ADMIN && (
							<button
								className="focus:outline-hidden flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
								onClick={() => push(PRINCIPAL_LINKS.USERS)}
							>
								Gerenciar usuários
							</button>
						)}
						<button
							className="focus:outline-hidden flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
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
