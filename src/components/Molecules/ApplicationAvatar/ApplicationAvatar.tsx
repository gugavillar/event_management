import { Dispatch, SetStateAction } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { IoTicket } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'

import { Button, Text } from '@/components/Atoms'

type ApplicationAvatarProps = {
	collapsed: boolean
	handleCollapse: Dispatch<SetStateAction<boolean>>
}

export const ApplicationAvatar = ({
	collapsed,
	handleCollapse,
}: ApplicationAvatarProps) => {
	return (
		<section
			className={twMerge(
				'flex items-center gap-x-4',
				collapsed && 'justify-center',
			)}
			data-testid="application-avatar"
		>
			{!collapsed && (
				<>
					<IoTicket
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
				className="inline-flex items-center justify-center gap-x-0 rounded-lg border-none p-2 text-lg font-medium text-gray-100 transition-colors duration-500 [--placement:right] hover:bg-slate-900/80"
			>
				{collapsed ? <IoIosArrowForward /> : <IoIosArrowBack />}
			</Button>
		</section>
	)
}
