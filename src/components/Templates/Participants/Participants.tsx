'use client'
import { useEffect, useState } from 'react'

import { UUID } from 'crypto'

import { Button, Select } from '@/components/Atoms'
import { ImportButton, ListManager } from '@/components/Molecules'
import {
	AddressInfoCard,
	FamilyContactInfo,
	HealthInfoCard,
	ListPage,
	PageContent,
	PersonalInfoCard,
	ImportFileModal,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen, StatusSelectOptions } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'

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

	const { data: events } = useGetEvents()

	const handleClickRow = async ({ id }: { id: UUID }) => {
		console.log(id)
		overlayOpen(MODALS_IDS.PARTICIPANT_DRAWER)
	}

	useEffect(() => {
		if (tableData) return

		setTableData(FAKE_PARTICIPANTES())
	}, [tableData])

	const formattedEvents = formatterFieldSelectValues(events?.data, 'name', 'id')

	return (
		<PageContent
			subheadingPage="Listagem de participantes"
			isLoading={!tableData}
		>
			<ListPage
				placeholderField="Encontrar um participante"
				className="lg:max-w-full"
				actionButton={
					<ImportButton
						label="Importar participantes"
						modalId={MODALS_IDS.IMPORT_PARTICIPANTS_MODAL}
					/>
				}
				moreFilter={
					<>
						<Select
							placeholder="Selecione o evento"
							options={formattedEvents}
						/>
						<Select
							placeholder="Selecione o status"
							options={StatusSelectOptions}
						/>
					</>
				}
			>
				<ListManager
					handleClickRow={handleClickRow}
					bodyData={tableData ?? []}
					headerLabels={HEADER_LABELS}
					isLoading={true}
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
								<FamilyContactInfo responsibleInfo={MOCKED_USER.responsible} />
							) : null}
							{MOCKED_USER.healthInfo ? (
								<HealthInfoCard healthInfo={MOCKED_USER.healthInfo} />
							) : null}
						</>
					}
				/>
			</ListPage>
			<ImportFileModal modalId={MODALS_IDS.IMPORT_PARTICIPANTS_MODAL} />
		</PageContent>
	)
}
