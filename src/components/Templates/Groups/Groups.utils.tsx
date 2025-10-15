import { SquarePen, Trash2 } from 'lucide-react'

import { Header, Spinner, Text, Tooltip } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { MEMBERS, MembersTypes } from '@/constants'
import { formatBirthdate, formatPhone } from '@/formatters'
import type { GroupAPI } from '@/services/queries/groups/groups.types'

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
		accessor: 'group',
		label: 'Grupo',
	},
]

export const formatTableData = (data: Array<GroupAPI> | undefined) => {
	if (!data) return []

	return data?.map((group) => {
		return {
			id: group.id,
			members: group.members.map((member) => {
				const memberType = member.type === MEMBERS.PARTICIPANT ? 'participant' : 'volunteer'

				return {
					address: `${member[memberType]?.address?.street?.trim()}, ${member[memberType]?.address?.number?.trim()}, ${member[memberType]?.address?.neighborhood?.trim()}, ${member[memberType]?.address?.city}-${member[memberType]?.address?.state}`,
					birthdate: formatBirthdate(
						member[memberType]?.birthdate as string,
						member[memberType]?.event?.finalDate as string
					),
					group: group.name,
					id: member.id,
					member: member.type === MEMBERS.PARTICIPANT ? member.participant?.name : member.volunteer?.name,
					phone: formatPhone(member[memberType]?.phone ?? ''),
					type: MembersTypes[member.type].label,
				}
			}),
			name: group.name.trim(),
		}
	})
}

export const Content = (
	selectedEvent: string,
	isFetching: boolean,
	groups: ReturnType<typeof formatTableData>,
	handleRemoveGroup: (id: GroupAPI['id']) => void,
	handleEditGroup: (id: GroupAPI['id']) => void
) => {
	if (!selectedEvent) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">Selecione um evento</h3>
				<p className="mt-2 text-gray-500">
					Os grupos são exibidos conforme o evento selecionado. Escolha um para continuar.
				</p>
			</div>
		)
	}

	if (!isFetching && !groups?.length) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">Nenhum grupo encontrado</h3>
				<p className="mt-2 text-gray-500">Nenhum grupo foi criado para o evento selecionado.</p>
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
				<h3 className="text-lg font-bold text-gray-800">Nenhum membro encontrado</h3>
				<p className="mt-2 text-gray-500">
					Verifique se digitou corretamente ou experimente usar apenas parte do nome.
				</p>
			</div>
		)
	}

	return groups?.map((data) => {
		if (!data.members.length) return <></>

		const sortedMembers = data?.members?.sort((memberA, memberB) => memberB.type?.localeCompare(memberA.type))

		const totalOfParticipants = sortedMembers?.filter(
			(member) => member.type === MembersTypes[MEMBERS.PARTICIPANT].label
		)?.length

		const totalOfLeaders = sortedMembers?.filter(
			(member) => member.type === MembersTypes[MEMBERS.VOLUNTEER].label
		)?.length

		return (
			<div className="space-y-2" key={data.id}>
				<div className="flex items-center justify-between">
					<div className="flex flex-col space-y-2.5">
						<Header>{data.name}</Header>
						<Text className="text-lg font-semibold">
							Participantes:{' '}
							<Text as="span" className="font-normal">
								{totalOfParticipants}
							</Text>
						</Text>
						<Text className="text-lg font-semibold">
							Líderes:{' '}
							<Text as="span" className="font-normal">
								{totalOfLeaders}
							</Text>
						</Text>
					</div>
					<div className="flex space-x-4">
						<div className="hs-tooltip">
							<SquarePen className="cursor-pointer" onClick={() => handleEditGroup(data.id)} size={20} />
							<Tooltip>Editar</Tooltip>
						</div>
						<div className="hs-tooltip">
							<Trash2 className="cursor-pointer" onClick={() => handleRemoveGroup(data.id)} size={20} />
							<Tooltip>Excluir</Tooltip>
						</div>
					</div>
				</div>
				<ListManager bodyData={sortedMembers} headerLabels={HEADER_LABELS} isLoading={isFetching} />
			</div>
		)
	})
}
