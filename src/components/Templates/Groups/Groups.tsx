'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { MdOutlineGroups } from 'react-icons/md'

import { Button, Header, Spinner } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { GroupDrawer, ListPage, PageContent } from '@/components/Organisms'
import {
	GroupSchema,
	GroupSchemaType,
} from '@/components/Organisms/GroupDrawer/GroupDrawer.schema'
import { MODALS_IDS } from '@/constants'

import { FAKE_LEADERS, FAKE_PARTICIPANTES } from './Groups.mocks'

const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Grupo',
		accessor: 'group',
	},
]

export const Groups = () => {
	const [tableData, setTableData] = useState<null | Array<
		ReturnType<typeof FAKE_PARTICIPANTES>
	>>(null)
	const [leaders, setLeaders] = useState<ReturnType<typeof FAKE_LEADERS> | []>(
		[],
	)

	useEffect(() => {
		if (tableData) return

		const leadersFake = FAKE_LEADERS()
		const groups = []
		for (let i = 1; i <= 4; i++) {
			groups.push(FAKE_PARTICIPANTES(i))
		}

		setLeaders(leadersFake)
		setTableData(groups)
	}, [leaders, tableData])

	const methods = useForm<GroupSchemaType>({
		mode: 'onChange',
		resolver: zodResolver(GroupSchema),
		defaultValues: {
			name: '',
			leader: '',
			participants: [{ selected: '' }],
		},
	})

	return (
		<PageContent subheadingPage="Listagem de grupos">
			{!tableData ? (
				<Spinner />
			) : (
				<ListPage
					placeholderField="Encontrar um participante"
					className="w-full lg:max-w-full"
					actionButton={
						<Button
							type="button"
							data-hs-overlay={`#${MODALS_IDS.GROUP_DRAWER}`}
							leftIcon={<MdOutlineGroups />}
							className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
						>
							Criar um novo grupo
						</Button>
					}
				>
					{tableData?.map((data, index) => (
						<div key={index} className="space-y-2">
							<Header>Grupo {index + 1}</Header>
							<ListManager headerLabels={HEADER_LABELS} bodyData={data} />
						</div>
					))}
				</ListPage>
			)}
			<FormProvider {...methods}>
				<GroupDrawer drawerId={MODALS_IDS.GROUP_DRAWER} leaders={leaders} />
			</FormProvider>
		</PageContent>
	)
}
