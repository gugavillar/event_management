import { IoTicket } from 'react-icons/io5'

import { Text } from '@/components/Atoms'

export const ApplicationAvatar = () => {
	return (
		<section className="flex items-center gap-x-4">
			<IoTicket size={48} className="text-slate-100" />
			<div>
				<Text className="text-xl font-bold text-gray-50">Hub de Eventos</Text>
				<Text className="text-lg text-gray-100/30">Anglicana Vida</Text>
			</div>
		</section>
	)
}
