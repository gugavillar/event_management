'use client'
import { Controller, type SubmitHandler, useFormContext } from 'react-hook-form'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	InputField,
	CurrencyInputField,
	SearchBox,
} from '@/components/Molecules'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'

import { DonationType } from './DonationDrawer.schema'

type DonationDrawerProps = {
	drawerId: string
}

export const DonationDrawer = ({ drawerId }: DonationDrawerProps) => {
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		search,
		setSearch,
	} = useGetInfinityEvents()
	const {
		handleSubmit,
		reset,
		control,
		formState: { isValid, isDirty, errors },
	} = useFormContext<DonationType>()

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

	const onSubmit: SubmitHandler<DonationType> = async (values) => {
		if (!values) return

		console.log(values)
	}

	const handleClose = () => {
		reset()
	}

	return (
		<Drawer
			drawerId={drawerId}
			headingTitle="Nova doação"
			handleClose={handleClose}
		>
			<DrawerBody>
				<Controller
					name="eventId"
					control={control}
					render={({ field }) => (
						<SearchBox
							search={search}
							setSearch={setSearch}
							keyOptionLabel="label"
							keyOptionValue="value"
							options={formattedEvents}
							selectedValue={field.value}
							setSelectedValue={field.onChange}
							lastItemRef={lastItemRef}
							label="Evento"
							error={errors.eventId?.message}
						/>
					)}
				/>
				<InputField fieldName="name">Nome do doador</InputField>
				<CurrencyInputField type="tel" fieldName="value">
					Valor
				</CurrencyInputField>
			</DrawerBody>
			<DrawerFooter>
				<Button
					className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					onClick={handleSubmit(onSubmit)}
					type="submit"
					disabled={!isValid || !isDirty}
				>
					Criar doação
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
