'use client'
import { useEffect, useState } from 'react'

import { Button, Select, Spinner, TableProps } from '@/components/Atoms'
import { ImportButton, ListManager } from '@/components/Molecules'
import {
	ListPage,
	PageContent,
	PersonalInfoCard,
	AddressInfoCard,
} from '@/components/Organisms'
import { MODALS_IDS, StatusSelectOptions } from '@/constants'

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

export const Volunteers = () => {
	const [tableData, setTableData] = useState<null | ReturnType<
		typeof FAKE_VOLUNTEERS
	>>()

	const handleClickRow = async ({ id }: TableProps['bodyData'][number]) => {
		console.log(id)
		const overlay = await import('preline/preline')
		overlay.HSOverlay.open(
			document.getElementById(MODALS_IDS.VOLUNTEER_DRAWER) as HTMLElement,
		)
	}

	useEffect(() => {
		if (tableData) return

		setTableData(FAKE_VOLUNTEERS())
	}, [tableData])

	return (
		<PageContent subheadingPage="Listagem de voluntários">
			{!tableData ? (
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
					actionButton={<ImportButton label="Importar voluntários" />}
				>
					<ListManager
						handleClickRow={handleClickRow}
						bodyData={tableData}
						headerLabels={HEADER_LABELS}
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
