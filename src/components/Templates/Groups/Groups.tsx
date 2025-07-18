'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, UsersRound } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button, Field } from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import { ListPage, PageContent } from '@/components/Organisms'
import {
	GroupSchema,
	GroupSchemaType,
} from '@/components/Organisms/GroupDrawer/GroupDrawer.schema'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetGroupByEventId } from '@/services/queries/groups'
import { GroupAPI } from '@/services/queries/groups/groups.types'

import { Content, formatTableData } from './Groups.utils'

const GroupDeleteModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.GroupDeleteModal),
)

const GroupDrawer = dynamic(
	() => import('@/components/Organisms').then((mod) => mod.GroupDrawer),
	{
		ssr: false,
	},
)

const DownloadPDF = dynamic(() =>
	import('./GroupsPrint').then((mod) => mod.DownloadPDF),
)

export const Groups = ({ eventId }: { eventId: string }) => {
	const [selectedGroup, setSelectedGroup] = useState<GroupAPI['id'] | null>(
		null,
	)

	const {
		data: groups,
		groupEventId,
		setGroupEventId,
		isLoading,
		searchMemberGroup,
		setSearchMemberGroup,
	} = useGetGroupByEventId(eventId)
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()

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

	const handleOpenModalToDeleteGroup = useCallback((id: GroupAPI['id']) => {
		setSelectedGroup(id)
		overlayOpen(MODALS_IDS.GROUP_REMOVE_MODAL)
	}, [])

	const handleOpenDrawerToCreateOrEditGroup = useCallback(
		(id?: GroupAPI['id']) => {
			if (id) {
				setSelectedGroup(id)
			} else {
				setSelectedGroup(null)
			}
			overlayOpen(MODALS_IDS.GROUP_DRAWER)
		},
		[],
	)

	const formattedGroups = formatTableData(groups)

	return (
		<PageContent subheadingPage="Listagem de grupos">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<DownloadPDF groups={formattedGroups} />
				<Button
					type="button"
					onClick={() => handleOpenDrawerToCreateOrEditGroup()}
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
							selectedValue={groupEventId}
							setSelectedValue={setGroupEventId}
							lastItemRef={lastItemRef}
							placeholder="Selecione um evento"
						/>
						<Field
							placeholder="Encontrar membro"
							rightIcon={<Search size={24} />}
							className="ps-11"
							value={searchMemberGroup}
							disabled={!groupEventId}
							onChange={(event) => setSearchMemberGroup(event.target.value)}
						/>
					</>
				}
			>
				{Content(
					groupEventId,
					isLoading,
					formattedGroups,
					handleOpenModalToDeleteGroup,
					handleOpenDrawerToCreateOrEditGroup,
				)}
			</ListPage>
			<FormProvider {...methods}>
				<GroupDrawer
					drawerId={MODALS_IDS.GROUP_DRAWER}
					selectedGroup={selectedGroup}
					setSelectedGroup={setSelectedGroup}
				/>
			</FormProvider>
			<GroupDeleteModal
				modalId={MODALS_IDS.GROUP_REMOVE_MODAL}
				selectedGroup={selectedGroup}
				setSelectedGroup={setSelectedGroup}
			/>
		</PageContent>
	)
}
