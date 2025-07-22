'use client'
import { Controller, type SubmitHandler, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	InputField,
	CurrencyInputField,
	SearchBox,
} from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { formatterComboBoxValues, removeCurrencyFormat } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useCreateDonation } from '@/services/queries/donations'
import { useGetInfinityEvents } from '@/services/queries/events'
import { generateToastError } from '@/utils/errors'

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
	const { create, isPending } = useCreateDonation()
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

		const formattedValues = {
			...values,
			value: Number(removeCurrencyFormat(values.value)),
		}

		await create(formattedValues, {
			onSuccess: () => {
				reset()
				toast.success('Doação criada com sucesso!')
				overlayClose(drawerId)
			},
			onError: (error) => generateToastError(error, 'Erro ao criar doação'),
		})
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
					isLoading={isPending}
				>
					Criar doação
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
