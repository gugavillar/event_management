'use client'
import { memo } from 'react'
import { Controller, type SubmitHandler, useFormContext } from 'react-hook-form'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	CurrencyInputField,
	InputField,
	MaskedInputField,
	SearchBox,
	SelectField,
} from '@/components/Molecules'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useCreateParticipant } from '@/services/queries/participants'

import { TransactionType } from './TransactionDrawer.schema'
import { TRANSACTION_TYPE } from './TransactionDrawer.utils'

type TransactionDrawerProps = {
	drawerId: string
}

export const TransactionDrawer = memo(
	({ drawerId }: TransactionDrawerProps) => {
		const {
			handleSubmit,
			reset,
			control,
			formState: { isValid, isDirty, errors },
		} = useFormContext<TransactionType>()
		const {
			data: events,
			hasNextPage,
			isFetchingNextPage,
			fetchNextPage,
			search,
			setSearch,
		} = useGetInfinityEvents()
		const { isPending: isCreating } = useCreateParticipant()

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

		const handleSubmitForm: SubmitHandler<TransactionType> = async (values) => {
			if (!values) return

			console.log(values)
		}

		const handleClose = () => {
			reset()
		}

		return (
			<Drawer
				drawerId={drawerId}
				headingTitle="Dados da transação"
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
					<SelectField
						fieldName="type"
						placeholder="Selecione uma opção"
						options={TRANSACTION_TYPE}
					>
						Tipo
					</SelectField>
					<CurrencyInputField type="tel" fieldName="amount">
						Valor
					</CurrencyInputField>
					<InputField fieldName="description">Descrição</InputField>
					<MaskedInputField format="##/##/####" fieldName="date">
						Data
					</MaskedInputField>
				</DrawerBody>
				<DrawerFooter>
					<Button
						className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
						onClick={handleSubmit(handleSubmitForm)}
						type="submit"
						isLoading={isCreating}
						disabled={!isValid || !isDirty}
					>
						Salvar
					</Button>
				</DrawerFooter>
			</Drawer>
		)
	},
)

TransactionDrawer.displayName = 'TransactionDrawer'
