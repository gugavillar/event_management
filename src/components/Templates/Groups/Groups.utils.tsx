import { Header, Spinner } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { MEMBERS, MembersTypes } from '@/constants'
import { GroupAPI } from '@/services/queries/groups/groups.types'

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
) => {
	if (!selectedEvent) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 md:p-5">
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
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 md:p-5">
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

	return groups?.map((data) => (
		<div key={data.id} className="space-y-2">
			<Header>{data.name}</Header>
			<ListManager
				headerLabels={HEADER_LABELS}
				bodyData={data.members}
				isLoading={isFetching}
			/>
		</div>
	))
}
