import { SquarePen, Trash2 } from 'lucide-react'

import { Header, Spinner, Tooltip } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { MEMBERS, MembersTypes } from '@/constants'
import type { RoomAPI } from '@/services/queries/rooms/rooms.types'

export const HEADER_LABELS = [
	{
		accessor: 'member',
		className: 'w-9/12',
		label: 'Nome',
	},
	{
		accessor: 'type',
		label: 'Tipo',
	},
	{
		accessor: 'roomNumber',
		label: 'Quarto',
	},
]

export const formatTableData = (data: Array<RoomAPI> | undefined) => {
	if (!data) return []

	return data?.map((room) => {
		return {
			id: room.id,
			members: room.members.map((member) => {
				return {
					id: member.id,
					member:
						member.type === MEMBERS.PARTICIPANT
							? member.participant?.name
							: member.volunteer?.name,
					roomNumber: room.roomNumber,
					type: MembersTypes[member.type].label,
				}
			}),
			roomNumber: room.roomNumber,
		}
	})
}

export const Content = (
	selectedEvent: string,
	isFetching: boolean,
	rooms: ReturnType<typeof formatTableData>,
	handleRemoveRoom: (id: RoomAPI['id']) => void,
	handleEditRoom: (id: RoomAPI['id']) => void
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

	const hasMembers = rooms?.map((data) => !!data.members.length).some(Boolean)

	if (!hasMembers) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">
					Nenhum membro encontrado
				</h3>
				<p className="mt-2 text-gray-500">
					Verifique se digitou corretamente ou experimente usar apenas parte do
					nome.
				</p>
			</div>
		)
	}

	return rooms?.map(
		(data) =>
			!!data.members.length && (
				<div className="space-y-2" key={data.id}>
					<div className="flex items-center justify-between">
						<Header>Quarto - {data.roomNumber}</Header>
						<div className="flex space-x-4">
							<div className="hs-tooltip">
								<SquarePen
									className="cursor-pointer"
									onClick={() => handleEditRoom(data.id)}
									size={20}
								/>
								<Tooltip>Editar</Tooltip>
							</div>
							<div className="hs-tooltip">
								<Trash2
									className="cursor-pointer"
									onClick={() => handleRemoveRoom(data.id)}
									size={20}
								/>
								<Tooltip>Excluir</Tooltip>
							</div>
						</div>
					</div>
					<ListManager
						bodyData={data.members}
						headerLabels={HEADER_LABELS}
						isLoading={isFetching}
					/>
				</div>
			)
	)
}
