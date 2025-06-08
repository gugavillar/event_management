import { SquarePen, Trash2 } from 'lucide-react'

import { Header, Spinner, Tooltip } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { MEMBERS, MembersTypes } from '@/constants'
import { RoomAPI } from '@/services/queries/rooms/rooms.types'

export const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'member',
	},
	{
		label: 'Tipo',
		accessor: 'type',
	},
	{
		label: 'Quarto',
		accessor: 'roomNumber',
	},
]

export const formatTableData = (data: Array<RoomAPI> | undefined) => {
	if (!data) return []

	return data?.map((room) => {
		return {
			id: room.id,
			roomNumber: room.roomNumber,
			members: room.members.map((member) => {
				return {
					id: member.id,
					type: MembersTypes[member.type].label,
					roomNumber: room.roomNumber,
					member:
						member.type === MEMBERS.PARTICIPANT
							? member.participant?.name
							: member.volunteer?.name,
				}
			}),
		}
	})
}

export const Content = (
	selectedEvent: string,
	isFetching: boolean,
	rooms: ReturnType<typeof formatTableData>,
	handleRemoveRoom: (id: RoomAPI['id']) => void,
	handleEditRoom: (id: RoomAPI['id']) => void,
) => {
	if (!selectedEvent) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">Selecione um evento</h3>
				<p className="mt-2 text-gray-500">
					Os quartos são exibidos conforme o evento selecionado. Escolha um para
					continuar.
				</p>
			</div>
		)
	}

	if (!isFetching && !rooms?.length) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">
					Nenhum quarto encontrado
				</h3>
				<p className="mt-2 text-gray-500">
					Nenhum quarto foi criado para o evento selecionado.
				</p>
			</div>
		)
	}

	if (isFetching) {
		return (
			<div className="flex h-80 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 md:p-5">
				<Spinner />
			</div>
		)
	}

	return rooms?.map((data) => (
		<div key={data.id} className="space-y-2">
			<div className="flex items-center justify-between">
				<Header>Quarto - {data.roomNumber}</Header>
				<div className="flex space-x-4">
					<div className="hs-tooltip">
						<SquarePen
							className="cursor-pointer"
							size={20}
							onClick={() => handleEditRoom(data.id)}
						/>
						<Tooltip>Editar</Tooltip>
					</div>
					<div className="hs-tooltip">
						<Trash2
							className="cursor-pointer"
							size={20}
							onClick={() => handleRemoveRoom(data.id)}
						/>
						<Tooltip>Excluir</Tooltip>
					</div>
				</div>
			</div>
			<ListManager
				headerLabels={HEADER_LABELS}
				bodyData={data.members}
				isLoading={isFetching}
			/>
		</div>
	))
}
