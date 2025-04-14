'use client'
import { UUID } from 'crypto'

import { Button, Select, Spinner } from '@/components/Atoms'
import { ImportButton, ListManager } from '@/components/Molecules'
import {
	ListPage,
	PageContent,
	PersonalInfoCard,
	AddressInfoCard,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen, StatusSelectOptions } from '@/constants'

import { FAKE_VOLUNTEERS, MOCKED_USER } from './Volunteers.mocks'

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
					actionButton={
						<ImportButton modalId="teste" label="Importar voluntários" />
					}
				>
					<ListManager
						handleClickRow={handleClickRow}
						bodyData={volunteers}
						headerLabels={HEADER_LABELS}
						isLoading={false}
						drawerId={MODALS_IDS.VOLUNTEER_DRAWER}
						drawerTitle="Dados do voluntário"
						drawerFooter={
							<>
								<Button className="w-full justify-center bg-red-500 text-gray-50 transition-colors duration-500 hover:bg-red-400 hover:text-gray-800">
									Cancelar participação
								</Button>
								<Button className="w-full justify-center bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-gray-800">
									Confirmar participação
								</Button>
							</>
						}
						drawerContent={
							<>
								<PersonalInfoCard userInfo={MOCKED_USER} />
								<AddressInfoCard addressInfo={MOCKED_USER.address} />
							</>
						}
					/>
				</ListPage>
			)}
		</PageContent>
	)
}
