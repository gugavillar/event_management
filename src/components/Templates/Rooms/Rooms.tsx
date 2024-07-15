'use client'
import { useEffect, useState } from 'react'
import { MdRoomService } from 'react-icons/md'

import { Button, Header, Spinner } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ListPage, PageContent } from '@/components/Organisms'
import { MODALS_IDS } from '@/constants'

import { FAKE_COLLABORATORS } from './Rooms.mocks'

const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Quarto',
		accessor: 'room',
	},
]

export const Rooms = () => {
	const [tableData, setTableData] = useState<null | Array<
		ReturnType<typeof FAKE_COLLABORATORS>
	>>(null)
	// const [leaders, setLeaders] = useState<
	// 	ReturnType<typeof FAKE_PARTICIPANTES> | []
	// >([])

	useEffect(() => {
		if (tableData) return

		// const leadersFake = FAKE_PARTICIPANTES()
		const groups = []
		for (let i = 1; i <= 4; i++) {
			groups.push(FAKE_COLLABORATORS())
		}

		// setLeaders(leadersFake)
		setTableData(groups)
	}, [tableData])

	return (
		<PageContent subheadingPage="Listagem de quartos">
			{!tableData ? (
				<Spinner />
			) : (
				<ListPage
					placeholderField="Encontrar um colaborador"
					className="w-full lg:max-w-full"
					actionButton={
						<Button
							type="button"
							data-hs-overlay={`#${MODALS_IDS.GROUP_DRAWER}`}
							leftIcon={<MdRoomService />}
							className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
						>
							Criar um novo quarto
						</Button>
					}
				>
					{tableData?.map((data) => (
						<div key={data.number} className="space-y-2">
							<Header>Quarto {data.number}</Header>
							<ListManager headerLabels={HEADER_LABELS} bodyData={data.data} />
						</div>
					))}
				</ListPage>
			)}
			{/* <GroupDrawer drawerId={MODALS_IDS.GROUP_DRAWER} leaders={leaders} /> */}
		</PageContent>
	)
}
