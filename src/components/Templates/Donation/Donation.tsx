'use client'
import { useQueryState } from 'nuqs'

import { ListManager } from '@/components/Molecules'
import { DonationHeader, ListPage, PageContent } from '@/components/Organisms'

import { HEADER_LABELS } from './Donation.utils'

export const Donation = () => {
	const [event, setEvent] = useQueryState('eventId', {
		defaultValue: '',
	})
	return (
		<PageContent subheadingPage="Lista das doações" pageTitle="Doações">
			<DonationHeader eventId={event} setEventId={setEvent} />
			<ListPage className="lg:max-w-full">
				<ListManager
					bodyData={[]}
					headerLabels={HEADER_LABELS}
					isLoading={false}
				/>
				{/* {hasMoreThanOnePage && (
								<Pagination
									currentPage={page}
									totalPages={participants?.totalPages}
									setPage={setPage}
								/>
							)} */}
			</ListPage>
		</PageContent>
	)
}
