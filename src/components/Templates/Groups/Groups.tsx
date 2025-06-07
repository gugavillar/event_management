'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button, Field, Header } from '@/components/Atoms'
import { ComboBox, ListManager } from '@/components/Molecules'
import { GroupDrawer, ListPage, PageContent } from '@/components/Organisms'
import {
	GroupSchema,
	GroupSchemaType,
} from '@/components/Organisms/GroupDrawer/GroupDrawer.schema'
import { MODALS_IDS } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'

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
	const [eventId, setEventId] = useState('')
	const [search, setSearch] = useState('')
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()

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
			eventId: '',
			name: '',
			members: [{ type: '', member: '' }],
		},
	})

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
	)
	const lastItemRef = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
	})

	return (
		<PageContent subheadingPage="Listagem de grupos">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<Button
					type="button"
					data-hs-overlay={`#${MODALS_IDS.GROUP_DRAWER}`}
					leftIcon={<UsersRound />}
					className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				>
					Criar um novo grupo
				</Button>
			</div>
			<ListPage
				className="w-full lg:max-w-full"
				moreFilter={
					<>
						<ComboBox
							keyOptionLabel="label"
							keyOptionValue="value"
							options={formattedEvents}
							selectedValue={eventId}
							setSelectedValue={setEventId}
							lastItemRef={lastItemRef}
						/>
						<Field
							placeholder="Encontrar participante ou voluntário"
							rightIcon={<Search size={24} />}
							className="ps-11"
							value={search}
							onChange={(event) => setSearch?.(event.target.value)}
						/>
					</>
				}
			>
				{tableData?.map((data, index) => (
					<div key={index} className="space-y-2">
						<Header>Grupo {index + 1}</Header>
						<ListManager
							headerLabels={HEADER_LABELS}
							bodyData={data}
							isLoading={false}
						/>
					</div>
				))}
			</ListPage>
			<FormProvider {...methods}>
				<GroupDrawer drawerId={MODALS_IDS.GROUP_DRAWER} leaders={leaders} />
			</FormProvider>
		</PageContent>
	)
}
