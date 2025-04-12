'use client'
import { useEffect, useState } from 'react'

import { UUID } from 'crypto'

import { Select, Spinner } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ListPage, PageContent, PaymentModal } from '@/components/Organisms'
import {
	CollaboratorTypeSelectOptions,
	MODALS_IDS,
	overlayOpen,
} from '@/constants'

import { FAKE_COLLABORATORS } from './Payments.mocks'

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
		label: 'Tipo de colaborador',
		accessor: 'collaboratorType',
	},
	{
		label: 'Valor pago',
		accessor: 'valuePayed',
	},
	{
		label: 'Status',
		accessor: 'payment',
	},
]

export const Payments = () => {
	const [tableData, setTableData] = useState<null | ReturnType<
		typeof FAKE_COLLABORATORS
	>>()

	const handleClickRow = async ({ id }: { id: UUID }) => {
		console.log(id)
		overlayOpen(MODALS_IDS.PAYMENT_MODAL)
	}

	useEffect(() => {
		if (tableData) return

		setTableData(FAKE_COLLABORATORS())
	}, [tableData])

	return (
		<>
			<PageContent subheadingPage="Listagem de colaboradores do evento">
				{!tableData ? (
					<Spinner />
				) : (
					<ListPage
						placeholderField="Encontrar um colaborador"
						className="lg:max-w-full"
						moreFilter={
							<Select
								placeholder="Selecione o tipo do colaborador"
								options={CollaboratorTypeSelectOptions}
							/>
						}
					>
						<ListManager
							bodyData={tableData}
							headerLabels={HEADER_LABELS}
							handleClickRow={handleClickRow}
							isLoading={false}
						/>
					</ListPage>
				)}
			</PageContent>
			<PaymentModal modalId={MODALS_IDS.PAYMENT_MODAL} />
		</>
	)
}
