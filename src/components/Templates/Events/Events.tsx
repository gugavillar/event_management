'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { LuCalendarPlus } from 'react-icons/lu'

import { Button, Spinner } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { EventDrawer, ListPage, PageContent } from '@/components/Organisms'
import {
	EventSchema,
	EventSchemaType,
} from '@/components/Organisms/EventDrawer/EventDrawer.schema'
import { MODALS_IDS } from '@/constants'
import { useGetEvents } from '@/services/queries/events'

import { formatTableData, HEADER_LABELS } from './Events.utils'

export const Events = () => {
	const { data, isLoading, search, setSearch } = useGetEvents()

	const methods = useForm<EventSchemaType>({
		defaultValues: {
			name: '',
			gender: undefined,
			initialDate: '',
			finalDate: '',
			participantPrice: '',
			volunteerPrice: '',
		},
		mode: 'onChange',
		resolver: zodResolver(EventSchema),
	})

	const formatData = formatTableData(data?.data)

	return (
		<PageContent subheadingPage="Listagem de eventos">
			{isLoading ? (
				<Spinner />
			) : (
				<ListPage
					placeholderField="Encontrar um evento"
					className="w-full lg:max-w-full"
					search={search}
					setSearch={setSearch}
					actionButton={
						<Button
							type="button"
							data-hs-overlay={`#${MODALS_IDS.EVENT_DRAWER}`}
							leftIcon={<LuCalendarPlus />}
							className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
						>
							Criar um novo evento
						</Button>
					}
				>
					<ListManager bodyData={formatData} headerLabels={HEADER_LABELS} />
				</ListPage>
			)}
			<FormProvider {...methods}>
				<EventDrawer drawerId={MODALS_IDS.EVENT_DRAWER} />
			</FormProvider>
		</PageContent>
	)
}
