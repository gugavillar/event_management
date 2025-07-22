'use client'

import { Pagination } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { DonationHeader, ListPage, PageContent } from '@/components/Organisms'
import { useGetDonations } from '@/services/queries/donations'

import { formatTableData, HEADER_LABELS } from './Donation.utils'

export const Donation = () => {
	const { data, isLoading, eventId, setEventId, page, setPage } =
		useGetDonations()

	const formatData = formatTableData(data?.data)

	const hasMoreThanOnePage = !!data?.totalPages && data.totalPages > 1

	return (
		<PageContent subheadingPage="Lista das doações" pageTitle="Doações">
			<DonationHeader
				eventId={eventId}
				setEventId={setEventId}
				sumOfAllDonations={data?.sumOfAllDonations}
			/>
			<ListPage className="lg:max-w-full">
				<ListManager
					bodyData={formatData}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
				/>
				{hasMoreThanOnePage && (
					<Pagination
						currentPage={page}
						totalPages={data?.totalPages}
						setPage={setPage}
					/>
				)}
			</ListPage>
		</PageContent>
	)
}
