import { IoTicket } from 'react-icons/io5'

import { Text } from '@/components/Atoms'

export const ApplicationAvatar = () => {
	return (
		<section
			className="flex items-center gap-x-4"
			data-testid="application-avatar"
		>
			<IoTicket
				size={48}
				className="text-slate-100"
				data-testid="ticket-icon"
			/>
			<div>
				<Text className="text-xl font-bold text-gray-100">Hub de Eventos</Text>
				<Text className="text-lg text-gray-100/40">Anglicana Vida</Text>
			</div>
		</section>
	)
}
