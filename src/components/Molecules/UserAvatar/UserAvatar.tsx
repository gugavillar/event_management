import { MdLogout } from 'react-icons/md'

import { Avatar, Button, Text, Tooltip } from '@/components/Atoms'

type UserAvatarProps = {
	collapsed: boolean
}

export const UserAvatar = ({ collapsed }: UserAvatarProps) => {
	return (
		<section className="mt-auto flex flex-col space-y-6">
			<div className="flex items-center gap-x-4">
				<Avatar>Usuário Teste</Avatar>
				{!collapsed && (
					<div>
						<Text className="font-bold text-gray-100">Usuário Teste</Text>
						<Text className="text-sm text-gray-100/40">Admin</Text>
					</div>
				)}
			</div>
			{collapsed ? (
				<Button className="hs-tooltip inline-flex items-center justify-center gap-x-0 rounded-lg border-none p-2 text-lg font-medium text-gray-100 transition-colors duration-500 [--placement:right] hover:bg-slate-900/80">
					<Tooltip>Sair</Tooltip>
					<MdLogout />
				</Button>
			) : (
				<Button className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800">
					Sair
				</Button>
			)}
		</section>
	)
}
