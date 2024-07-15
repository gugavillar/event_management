'use client'
import { useEffect, useState } from 'react'

import { Select, Spinner, TableProps } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ListPage, PageContent, PaymentModal } from '@/components/Organisms'
import { CollaboratorType, MODALS_IDS } from '@/constants'

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

	const handleClickRow = async ({ id }: TableProps['bodyData'][number]) => {
		console.log(id)
		const overlay = await import('preline/preline')
		overlay.HSOverlay.open(
			document.getElementById(MODALS_IDS.PAYMENT_MODAL) as HTMLElement,
		)
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
								options={[
									{
										label: CollaboratorType[1].label,
										value: CollaboratorType[1].value,
									},
									{
										label: CollaboratorType[2].label,
										value: CollaboratorType[2].value,
									},
								]}
							/>
						}
					>
						<ListManager
							bodyData={tableData}
							headerLabels={HEADER_LABELS}
							handleClickRow={handleClickRow}
						/>
					</ListPage>
				)}
			</PageContent>
			<PaymentModal modalId={MODALS_IDS.PAYMENT_MODAL} />
		</>
	)
}
