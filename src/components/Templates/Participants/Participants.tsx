'use client'
import { useEffect, useState } from 'react'

import { Button, Select, Spinner, TableProps } from '@/components/Atoms'
import { ImportButton, ListManager } from '@/components/Molecules'
import {
	AddressInfoCard,
	FamilyContactInfo,
	HealthInfoCard,
	ListPage,
	PageContent,
	PersonalInfoCard,
} from '@/components/Organisms'
import { MODALS_IDS, StatusType } from '@/constants'

import { FAKE_PARTICIPANTES, MOCKED_USER } from './Participants.mocks'

const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
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
		label: 'Cidade',
		accessor: 'city',
	},
	{
		label: 'Status',
		accessor: 'status',
	},
]

export const Participants = () => {
	const [tableData, setTableData] = useState<null | ReturnType<
		typeof FAKE_PARTICIPANTES
	>>(null)

	const handleClickRow = async ({ id }: TableProps['bodyData'][number]) => {
		console.log(id)
		const overlay = await import('preline/preline')
		overlay.HSOverlay.open(
			document.getElementById(MODALS_IDS.PARTICIPANT_DRAWER) as HTMLElement,
		)
	}

	useEffect(() => {
		if (tableData) return

		setTableData(FAKE_PARTICIPANTES())
	}, [tableData])

	return (
		<PageContent subheadingPage="Listagem de participantes">
			{!tableData ? (
				<Spinner />
			) : (
				<ListPage
					placeholderField="Encontrar um participante"
					className="lg:max-w-full"
					actionButton={<ImportButton label="Importar participantes" />}
					moreFilter={
						<Select
							placeholder="Selecione o status"
							options={[
								{ label: StatusType[1].label, value: StatusType[1].value },
								{ label: StatusType[2].label, value: StatusType[2].value },
							]}
						/>
					}
				>
					<ListManager
						handleClickRow={handleClickRow}
						bodyData={tableData}
						headerLabels={HEADER_LABELS}
						drawerId={MODALS_IDS.PARTICIPANT_DRAWER}
						drawerTitle="Dados do participante"
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
								{MOCKED_USER.responsible.length ? (
									<FamilyContactInfo
										responsibleInfo={MOCKED_USER.responsible}
									/>
								) : null}
								{MOCKED_USER.healthInfo ? (
									<HealthInfoCard healthInfo={MOCKED_USER.healthInfo} />
								) : null}
							</>
						}
					/>
				</ListPage>
			)}
		</PageContent>
	)
}
