import { SquarePen, Trash2 } from 'lucide-react'

import { Header, Spinner, Tooltip } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { MEMBERS, MembersTypes } from '@/constants'
import { GroupAPI } from '@/services/queries/groups/groups.types'

export const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'member',
		className: 'w-9/12',
	},
	{
		label: 'Tipo',
		accessor: 'type',
	},
	{
		label: 'Grupo',
		accessor: 'group',
	},
]

export const formatTableData = (data: Array<GroupAPI> | undefined) => {
	if (!data) return []

	return data?.map((group) => {
		return {
			id: group.id,
			name: group.name,
			members: group.members.map((member) => {
				return {
					id: member.id,
					type: MembersTypes[member.type].label,
					group: group.name,
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
	groups: ReturnType<typeof formatTableData>,
	handleRemoveGroup: (id: GroupAPI['id']) => void,
	handleEditGroup: (id: GroupAPI['id']) => void,
) => {
	if (!selectedEvent) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">Selecione um evento</h3>
				<p className="mt-2 text-gray-500">
					Os grupos são exibidos conforme o evento selecionado. Escolha um para
					continuar.
				</p>
			</div>
		)
	}

	if (!isFetching && !groups?.length) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">
					Nenhum grupo encontrado
				</h3>
				<p className="mt-2 text-gray-500">
					Nenhum grupo foi criado para o evento selecionado.
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

	const hasMembers = groups?.map((data) => !!data.members.length).some(Boolean)

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

	return groups?.map(
		(data) =>
			!!data.members.length && (
				<div key={data.id} className="space-y-2">
					<div className="flex items-center justify-between">
						<Header>{data.name}</Header>
						<div className="flex space-x-4">
							<div className="hs-tooltip">
								<SquarePen
									className="cursor-pointer"
									size={20}
									onClick={() => handleEditGroup(data.id)}
								/>
								<Tooltip>Editar</Tooltip>
							</div>
							<div className="hs-tooltip">
								<Trash2
									className="cursor-pointer"
									size={20}
									onClick={() => handleRemoveGroup(data.id)}
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
			),
	)
}
