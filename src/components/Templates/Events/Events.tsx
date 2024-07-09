'use client'
import { useEffect, useState } from 'react'
import { LuCalendarPlus } from 'react-icons/lu'

import { Button, Spinner } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ListPage, PageContent } from '@/components/Organisms'

import { FAKE_EVENTS } from './Events.mocks'

const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Gênero permitido',
		accessor: 'gender',
	},
	{
		label: 'Data inicial',
		accessor: 'initialDate',
	},
	{
		label: 'Data final',
		accessor: 'finalDate',
	},
]

export const Events = () => {
	const [tableData, setTableData] = useState<null | ReturnType<
		typeof FAKE_EVENTS
	>>(null)

	useEffect(() => {
		if (tableData) return

		setTableData(FAKE_EVENTS())
	}, [tableData])

	return (
		<PageContent subheadingPage="Listagem de eventos">
			{!tableData ? (
				<Spinner />
			) : (
				<ListPage
					placeholderField="Encontrar um evento"
					className="w-full lg:max-w-full"
					actionButton={
						<Button
							type="button"
							// data-hs-overlay={`#${MODALS_IDS.GROUP_DRAWER}`}
							leftIcon={<LuCalendarPlus />}
							className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
						>
							Criar um novo evento
						</Button>
					}
				>
					<ListManager bodyData={tableData} headerLabels={HEADER_LABELS} />
				</ListPage>
			)}
		</PageContent>
	)
}
