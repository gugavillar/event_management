'use client'
import { useEffect, useState } from 'react'

import { Spinner, TableProps } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ListPage, PageContent, PaymentModal } from '@/components/Organisms'
import { MODALS_IDS } from '@/constants'

import { FAKE_PARTICIPANTES } from './Payments.mocks'

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
		label: 'Status',
		accessor: 'payment',
	},
]

export const Payments = () => {
	const [tableData, setTableData] = useState<null | ReturnType<
		typeof FAKE_PARTICIPANTES
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

		setTableData(FAKE_PARTICIPANTES())
	}, [tableData])

	return (
		<>
			<PageContent subheadingPage="Listagem de colaboradores do evento">
				{!tableData ? (
					<Spinner />
				) : (
					<ListPage placeholderField="Encontrar um colaborador">
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
