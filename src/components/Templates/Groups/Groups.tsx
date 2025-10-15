'use client'
import { Search, UsersRound } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

import { Button, Field } from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import {
	GenerateGroupList,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import {
	GroupSchema,
	type GroupSchemaType,
} from '@/components/Organisms/GroupDrawer/GroupDrawer.schema'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetGroupByEventId } from '@/services/queries/groups'
import type { GroupAPI } from '@/services/queries/groups/groups.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Content, formatTableData } from './Groups.utils'

const GroupDeleteModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.GroupDeleteModal)
)

const GroupDrawer = dynamic(
	() => import('@/components/Organisms').then((mod) => mod.GroupDrawer),
	{
		ssr: false,
	}
)

export const Groups = ({ eventId }: { eventId: string }) => {
	const [selectedGroup, setSelectedGroup] = useState<GroupAPI['id'] | null>(
		null
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
		defaultValues: {
			eventId: '',
			members: [{ member: '', type: '' }],
			name: '',
		},
		mode: 'onChange',
		resolver: zodResolver(GroupSchema),
	})

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id'
	)

	const lastItemRef = useInfiniteScrollObserver({
		fetchNextPage,
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
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
		[]
	)

	const formattedGroups = formatTableData(groups)

	return (
		<PageContent subheadingPage="Listagem de grupos">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				{!!formattedGroups.length && (
					<GenerateGroupList
						formattedGroups={formattedGroups}
						modalId={MODALS_IDS.GENERATE_LIST_GROUP_MODAL}
					/>
				)}
				<Button
					className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					leftIcon={<UsersRound />}
					onClick={() => handleOpenDrawerToCreateOrEditGroup()}
					type="button"
				>
					Criar um novo grupo
				</Button>
			</div>
			<ListPage
				className="w-full flex-col md:flex-row lg:max-w-full"
				moreFilter={
					<>
						<ComboBox
							keyOptionLabel="label"
							keyOptionValue="value"
							lastItemRef={lastItemRef}
							options={formattedEvents}
							placeholder="Selecione um evento"
							selectedValue={groupEventId}
							setSelectedValue={setGroupEventId}
						/>
						<Field
							className="ps-11"
							disabled={!groupEventId}
							onChange={(event) => setSearchMemberGroup(event.target.value)}
							placeholder="Encontrar membro"
							rightIcon={<Search size={24} />}
							value={searchMemberGroup}
						/>
					</>
				}
			>
				{Content(
					groupEventId,
					isLoading,
					formattedGroups,
					handleOpenModalToDeleteGroup,
					handleOpenDrawerToCreateOrEditGroup
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
