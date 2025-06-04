import { PanelRightClose, PanelRightOpen, Tickets } from 'lucide-react'
import { Dispatch, memo, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button, Text } from '@/components/Atoms'

type ApplicationAvatarProps = {
	collapsed: boolean
	handleCollapse: Dispatch<SetStateAction<boolean>>
}

export const ApplicationAvatar = memo(
	({ collapsed, handleCollapse }: ApplicationAvatarProps) => {
		return (
			<section
				className={twMerge(
					'relative flex items-center gap-x-4',
					collapsed && 'justify-center',
				)}
				data-testid="application-avatar"
			>
				{!collapsed && (
					<>
						<Tickets
							size={48}
							className="text-slate-100"
							data-testid="ticket-icon"
						/>
						<div>
							<Text className="text-xl font-bold text-gray-100">
								Hub de Eventos
							</Text>
							<Text className="text-lg text-gray-100/40">Anglicana Vida</Text>
						</div>
					</>
				)}
				<Button
					type="button"
					onClick={() => handleCollapse(!collapsed)}
					className={twMerge(
						'absolute -top-3 hidden items-center justify-center gap-x-0 rounded-lg border-none bg-slate-900/80 p-0 text-lg font-medium text-gray-100 transition-all duration-500 md:inline-flex',
						collapsed ? 'left-12' : 'left-64',
					)}
				>
					{collapsed ? (
						<PanelRightClose size={28} />
					) : (
						<PanelRightOpen size={28} />
					)}
				</Button>
			</section>
		)
	},
)

ApplicationAvatar.displayName = 'ApplicationAvatar'
