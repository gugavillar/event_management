import { SquarePen, Trash2 } from 'lucide-react'

import { Spinner, Tooltip } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'

export const HEADER_LABELS = [
	{
		label: 'Função',
		accessor: 'role',
	},
	{
		label: 'Líder',
		accessor: 'leader',
	},
	{
		label: 'Qtd. voluntários',
		accessor: 'total',
	},
	{
		label: '',
		accessor: 'actions',
	},
]

export const formatTableData = (
	data: Array<VolunteersFunctionsFromAPI> | undefined,
	handleDeleteFunction: (selected: VolunteersFunctionsFromAPI) => void,
	handleEditFunction: (selected: VolunteersFunctionsFromAPI) => void,
) => {
	if (!data) return []

	return data?.map((role) => ({
		id: role.id,
		leader: !role.leaders.length
			? 'Sem líder'
			: role.leaders.map(({ name }) => name).join(', '),
		total: role.volunteers.length,
		role: role.volunteerRole.role,
		actions: (
			<div className="flex space-x-4">
				<div className="hs-tooltip">
					<SquarePen
						className="cursor-pointer"
						size={20}
						onClick={() => handleEditFunction(role)}
					/>
					<Tooltip>Editar</Tooltip>
				</div>
				<div className="hs-tooltip">
					<Trash2
						className="cursor-pointer"
						size={20}
						onClick={() => handleDeleteFunction(role)}
					/>
					<Tooltip>Excluir</Tooltip>
				</div>
			</div>
		),
	}))
}

export const Content = (
	eventId: string,
	isFetching: boolean,
	data: ReturnType<typeof formatTableData>,
) => {
	if (!eventId) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">Selecione um evento</h3>
				<p className="mt-2 text-gray-500">
					As funções são exibidas conforme o evento selecionado. Escolha um para
					continuar.
				</p>
			</div>
		)
	}

	if (!isFetching && !data?.length) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">
					Nenhuma função encontrada
				</h3>
				<p className="mt-2 text-gray-500">
					Nenhuma função foi criada para o evento selecionado.
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

	return (
		<ListManager
			bodyData={data}
			headerLabels={HEADER_LABELS}
			isLoading={isFetching}
		/>
	)
}
