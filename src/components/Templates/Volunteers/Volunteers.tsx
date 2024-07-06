'use client'
import { useEffect, useState } from 'react'

import { Button, Spinner, TableProps } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import {
	ListPage,
	PageContent,
	PersonalInfoCard,
	AddressInfoCard,
} from '@/components/Organisms'

import { FAKE_PARTICIPANTES, MOCKED_USER } from './Volunteers.mocks'

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
		typeof FAKE_PARTICIPANTES
	>>()

	const handleClickRow = async ({ id }: TableProps['bodyData'][number]) => {
		console.log(id)
		const overlay = await import('preline/preline')
		overlay.HSOverlay.open(
			document.getElementById('volunteer-manager') as HTMLElement,
		)
	}

	useEffect(() => {
		if (tableData) return

		setTableData(FAKE_PARTICIPANTES())
	}, [tableData])

	return (
		<PageContent subheadingPage="Listagem de voluntários">
			{!tableData ? (
				<Spinner />
			) : (
				<ListPage placeholderField="Encontrar um voluntário">
					<ListManager
						handleClickRow={handleClickRow}
						bodyData={tableData}
						headerLabels={HEADER_LABELS}
						drawerId="volunteer-manager"
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
