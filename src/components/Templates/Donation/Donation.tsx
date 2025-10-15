'use client'

import { useCallback, useState } from 'react'

import { Pagination } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { DonationDeleteModal, DonationHeader, ListPage, PageContent } from '@/components/Organisms'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { useGetDonations } from '@/services/queries/donations'
import type { DonationAPI } from '@/services/queries/donations/donations.types'

import { formatTableData, HEADER_LABELS } from './Donation.utils'

export const Donation = () => {
	const [selectedDonation, setSelectedDonation] = useState<DonationAPI['id'] | null>(null)
	const { data, isLoading, eventId, setEventId, page, setPage } = useGetDonations()

	const handleRemoveDonation = useCallback((id: DonationAPI['id']) => {
		setSelectedDonation(id)
		overlayOpen(MODALS_IDS.DONATION_REMOVE_MODAL)
	}, [])

	const formatData = formatTableData(data?.data, handleRemoveDonation)

	const hasMoreThanOnePage = !!data?.totalPages && data.totalPages > 1

	return (
		<PageContent pageTitle="Doações" subheadingPage="Lista das doações">
			<DonationHeader eventId={eventId} setEventId={setEventId} sumOfAllDonations={data?.sumOfAllDonations} />
			<ListPage className="lg:max-w-full">
				<ListManager bodyData={formatData} headerLabels={HEADER_LABELS} isLoading={isLoading} />
				{hasMoreThanOnePage && <Pagination currentPage={page} setPage={setPage} totalPages={data?.totalPages} />}
			</ListPage>
			<DonationDeleteModal
				modalId={MODALS_IDS.DONATION_REMOVE_MODAL}
				selectedDonation={selectedDonation}
				setSelectedDonation={setSelectedDonation}
			/>
		</PageContent>
	)
}
