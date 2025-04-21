'use client'
import { UUID } from 'crypto'

import { Select, Spinner } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ListPage, PageContent } from '@/components/Organisms'
import { MODALS_IDS, overlayOpen, StatusSelectOptions } from '@/constants'

import { FAKE_VOLUNTEERS } from './Volunteers.mocks'

const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Função',
		accessor: 'role',
	},
	{
		label: 'Telefone',
		accessor: 'phone',
	},
	{
		label: 'Data de nascimento',
		accessor: 'birthdate',
	},
	{
		label: 'Função',
		accessor: 'function',
	},
	{
		label: 'Status',
		accessor: 'status',
	},
]

type VolunteersProps = {
	volunteers: ReturnType<typeof FAKE_VOLUNTEERS>
}

export const Volunteers = ({ volunteers }: VolunteersProps) => {
	const handleClickRow = async ({ id }: { id: UUID }) => {
		console.log(id)
		overlayOpen(MODALS_IDS.VOLUNTEER_DRAWER)
	}

	return (
		<PageContent subheadingPage="Listagem de voluntários">
			{!volunteers ? (
				<Spinner />
			) : (
				<ListPage
					placeholderField="Encontrar um voluntário"
					className="lg:max-w-full"
					moreFilter={
						<Select
							placeholder="Selecione o status"
							options={StatusSelectOptions}
						/>
					}
				>
					<ListManager
						handleClickRow={handleClickRow}
						bodyData={volunteers}
						headerLabels={HEADER_LABELS}
						isLoading={false}
					/>
				</ListPage>
			)}
		</PageContent>
	)
}
