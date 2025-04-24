'use client'

import { Select } from '@/components/Atoms'
import { ImportVolunteersButton, ListManager } from '@/components/Molecules'
import {
	DownloadTemplateVolunteersButton,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import { MODALS_IDS, StatusSelectOptions } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'
import { useGetVolunteers } from '@/services/queries/volunteers'

import { formatTableData, HEADER_LABELS } from './Volunteers.utils'

export const Volunteers = () => {
	const { data: events } = useGetEvents()
	const {
		data,
		isLoading,
		search,
		setSearch,
		setEventId,
		eventId,
		status,
		setStatus,
	} = useGetVolunteers()

	const formattedEvents = formatterFieldSelectValues(events, 'name', 'id')

	const formattedVolunteers = formatTableData(data)

	return (
		<PageContent
			pageTitle="Voluntários"
			subheadingPage="Listagem de voluntários"
			isLoading={isLoading}
		>
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<DownloadTemplateVolunteersButton />
				<ImportVolunteersButton
					label="Importar voluntários"
					modalId={MODALS_IDS.IMPORT_VOLUNTEERS_MODAL}
				/>
			</div>
			<ListPage
				placeholderField="Encontrar um voluntário"
				className="lg:max-w-full"
				search={search}
				setSearch={setSearch}
				moreFilter={
					<>
						<Select
							placeholder="Selecione o evento"
							options={formattedEvents}
							value={eventId}
							onChange={(e) => setEventId(e.target.value)}
						/>
						<Select
							placeholder="Selecione o status"
							options={StatusSelectOptions}
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						/>
					</>
				}
			>
				<ListManager
					bodyData={formattedVolunteers}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
				/>
			</ListPage>
		</PageContent>
	)
}
