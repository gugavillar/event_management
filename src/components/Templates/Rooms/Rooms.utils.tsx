import { SquarePen, Trash2 } from 'lucide-react'

import { Header, Spinner, Tooltip } from '@/components/Atoms'
import { InfoCard, ListManager } from '@/components/Molecules'
import { COMMON_PROPS_TOOLTIPS_BUTTON_TABLE, MEMBERS, MembersTypes } from '@/constants'
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
					member: member.type === MEMBERS.PARTICIPANT ? member.participant?.name : member.volunteer?.name,
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
			<InfoCard
				description="Os quartos são exibidos conforme o evento selecionado. Escolha um para continuar."
				title="Selecione um evento"
			/>
		)
	}

	if (!isFetching && !rooms?.length) {
		return (
			<InfoCard description="Nenhum quarto foi criado para o evento selecionado" title="Nenhum quarto encontrado" />
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
			<InfoCard
				description="Verifique se digitou corretamente ou experimente usar apenas parte do nome."
				title="Nenhum membro encontrado"
			/>
		)
	}

	return rooms?.map(
		(data) =>
			!!data.members.length && (
				<div className="space-y-2" key={data.id}>
					<div className="flex items-center justify-between">
						<Header>Quarto - {data.roomNumber}</Header>
						<div className="flex space-x-4">
							<Tooltip
								{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
								trigger={<SquarePen className="cursor-pointer" onClick={() => handleEditRoom(data.id)} size={20} />}
							>
								Editar
							</Tooltip>
							<Tooltip
								{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
								trigger={<Trash2 className="cursor-pointer" onClick={() => handleRemoveRoom(data.id)} size={20} />}
							>
								Excluir
							</Tooltip>
						</div>
					</div>
					<ListManager bodyData={data.members} headerLabels={HEADER_LABELS} isLoading={isFetching} />
				</div>
			)
	)
}
