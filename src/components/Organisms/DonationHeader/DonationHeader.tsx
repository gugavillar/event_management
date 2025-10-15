'use client'

import { Header, InformationCard } from '@/components/Atoms'
import { ComboBox, CreateDonationButton } from '@/components/Molecules'
import { currencyValue, formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'

type DonationHeaderProps = {
	eventId: string
	setEventId: (value: string) => void
	sumOfAllDonations?: number
}

export const DonationHeader = ({ eventId, setEventId, sumOfAllDonations }: DonationHeaderProps) => {
	const { data: events, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetInfinityEvents()

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
		true,
		'Todos os eventos'
	)

	const lastItemRef = useInfiniteScrollObserver({
		fetchNextPage,
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
	})

	return (
		<section className="flex flex-col gap-6">
			<CreateDonationButton />
			<div className="flex flex-col items-end justify-between gap-x-12 gap-y-5 md:flex-row">
				<ComboBox
					className="lg:max-w-lg"
					keyOptionLabel="label"
					keyOptionValue="value"
					lastItemRef={lastItemRef}
					options={formattedEvents}
					selectedValue={eventId}
					setSelectedValue={setEventId}
				/>
				<InformationCard className="w-full lg:max-w-lg" headingText="Doações">
					<div className="flex h-full items-center justify-end p-4 md:p-5">
						<Header as="h3" className="text-2xl">
							{!sumOfAllDonations ? currencyValue(0) : currencyValue(sumOfAllDonations)}
						</Header>
					</div>
				</InformationCard>
			</div>
		</section>
	)
}
