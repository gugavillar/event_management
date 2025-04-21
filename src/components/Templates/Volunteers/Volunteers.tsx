'use client'

import { Select } from '@/components/Atoms'
import { ImportParticipantsButton, ListManager } from '@/components/Molecules'
import {
	DownloadTemplateVolunteersButton,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import { MODALS_IDS, StatusSelectOptions } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'

import { HEADER_LABELS } from './Volunteers.utils'

export const Volunteers = () => {
	const { data: events } = useGetEvents()

	const formattedEvents = formatterFieldSelectValues(events, 'name', 'id')

	return (
		<PageContent subheadingPage="Listagem de voluntários" isLoading={false}>
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<DownloadTemplateVolunteersButton />
				<ImportParticipantsButton
					label="Importar participantes"
					modalId={MODALS_IDS.IMPORT_PARTICIPANTS_MODAL}
				/>
			</div>
			<ListPage
				placeholderField="Encontrar um voluntário"
				className="lg:max-w-full"
				moreFilter={
					<>
						<Select
							placeholder="Selecione o evento"
							options={formattedEvents}
						/>
						<Select
							placeholder="Selecione o status"
							options={StatusSelectOptions}
						/>
					</>
				}
			>
				<ListManager
					bodyData={[]}
					headerLabels={HEADER_LABELS}
					isLoading={false}
				/>
			</ListPage>
		</PageContent>
	)
}
