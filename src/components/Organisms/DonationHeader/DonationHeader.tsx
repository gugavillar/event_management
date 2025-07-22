'use client'

import { Header, InformationCard } from '@/components/Atoms'
import { ComboBox, CreateDonationButton } from '@/components/Molecules'
import { currencyValue, formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'

type DonationHeaderProps = {
	eventId: string
	setEventId: (value: string) => void
}

export const DonationHeader = ({
	eventId,
	setEventId,
}: DonationHeaderProps) => {
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()

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
		<section className="flex flex-col gap-6">
			<CreateDonationButton />
			<div className="flex flex-col items-center justify-between gap-x-12 gap-y-5 md:flex-row">
				<ComboBox
					className="lg:max-w-lg"
					keyOptionLabel="label"
					keyOptionValue="value"
					options={formattedEvents}
					selectedValue={eventId}
					setSelectedValue={setEventId}
					label="Selecione o evento"
					lastItemRef={lastItemRef}
				/>
				<InformationCard headingText="Doações" className="w-full lg:max-w-lg">
					<div className="flex h-full items-center justify-end p-4 md:p-5">
						<Header as="h3" className="text-2xl">
							{!eventId ? currencyValue(0) : currencyValue(100)}
						</Header>
					</div>
				</InformationCard>
			</div>
		</section>
	)
}
