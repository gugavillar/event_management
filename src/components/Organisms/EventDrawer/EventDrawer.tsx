'use client'
import { type Dispatch, type SetStateAction, useEffect } from 'react'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	CurrencyInputField,
	InputField,
	MaskedInputField,
	SelectField,
} from '@/components/Molecules'
import { GenderSelectOptions, overlayClose } from '@/constants'
import { formatDateToSendToApi, removeCurrencyFormat } from '@/formatters'
import {
	useCreateEvent,
	useGetEvent,
	useUpdateEvent,
} from '@/services/queries/events'
import type { EventsAPI, FormEvent } from '@/services/queries/events/event.type'
import { generateToastError } from '@/utils/errors'
import { type SubmitHandler, useFormContext } from 'react-hook-form'
import type { EventSchemaType } from './EventDrawer.schema'

type EventDrawerProps = {
	drawerId: string
	selectedEvent: null | EventsAPI['id']
	setSelectedEvent: Dispatch<SetStateAction<EventsAPI['id'] | null>>
}

export const EventDrawer = ({
	drawerId,
	selectedEvent,
	setSelectedEvent,
}: EventDrawerProps) => {
	const {
		handleSubmit,
		reset,
		formState: { isValid, isDirty },
	} = useFormContext<EventSchemaType>()
	const { create, isPending: isPendingCreate } = useCreateEvent()
	const { update, isPending: isPendingUpdate } = useUpdateEvent()
	const { data, isLoading } = useGetEvent(selectedEvent)

	const onSubmit: SubmitHandler<EventSchemaType> = async (values) => {
		if (!values) return

		const formattedValues = {
			...values,
			finalDate: formatDateToSendToApi(values.finalDate),
			initialDate: formatDateToSendToApi(values.initialDate),
			participantPrice: Number(removeCurrencyFormat(values.participantPrice)),
			volunteerPrice: Number(removeCurrencyFormat(values.volunteerPrice)),
			...(values.minAge ? { minAge: Number(values.minAge) } : { minAge: null }),
			...(values.maxAge ? { maxAge: Number(values.maxAge) } : { maxAge: null }),
		} as FormEvent

		if (selectedEvent) {
			return await update(
				{
					data: formattedValues,
					eventId: selectedEvent,
				},
				{
					onError: (error) =>
						generateToastError(error, 'Erro ao atualizar evento'),
					onSuccess: () => {
						reset()
						setSelectedEvent(null)
						toast.success('Evento atualizado com sucesso!')
						overlayClose(drawerId)
					},
				}
			)
		}
		await create(formattedValues, {
			onError: (error) => generateToastError(error, 'Erro ao criar evento'),
			onSuccess: () => {
				reset()
				toast.success('Evento criado com sucesso!')
				overlayClose(drawerId)
			},
		})
	}

	const handleClose = () => {
		reset()
		setSelectedEvent(null)
	}

	useEffect(() => {
		if (!data) return reset()
		const { maxAge, minAge, ...rest } = data
		reset(
			{
				...rest,
				...(minAge && { minAge: String(minAge) }),
				...(maxAge && { maxAge: String(maxAge) }),
			},
			{ keepDefaultValues: true }
		)
	}, [data, reset])

	return (
		<Drawer
			drawerId={drawerId}
			handleClose={handleClose}
			headingTitle={selectedEvent ? 'Editar evento' : 'Novo evento'}
		>
			<DrawerBody isLoading={isLoading}>
				<InputField fieldName="name">Nome do evento</InputField>
				<SelectField
					fieldName="gender"
					options={GenderSelectOptions}
					placeholder="Selecione o gênero do evento"
				>
					Gênero do evento
				</SelectField>
				<div className="flex gap-3">
					<MaskedInputField fieldName="minAge" format="##" value={data?.minAge}>
						Idade mínima
					</MaskedInputField>
					<MaskedInputField fieldName="maxAge" format="##" value={data?.maxAge}>
						Idade máxima
					</MaskedInputField>
				</div>
				<CurrencyInputField
					fieldName="participantPrice"
					type="tel"
					value={data?.participantPrice}
				>
					Valor ficha participante
				</CurrencyInputField>
				<CurrencyInputField
					fieldName="volunteerPrice"
					type="tel"
					value={data?.volunteerPrice}
				>
					Valor ficha voluntário
				</CurrencyInputField>
				<MaskedInputField
					fieldName="initialDate"
					format="##/##/####"
					value={data?.initialDate}
				>
					Data de início do evento
				</MaskedInputField>
				<MaskedInputField
					fieldName="finalDate"
					format="##/##/####"
					value={data?.finalDate}
				>
					Data de término do evento
				</MaskedInputField>
			</DrawerBody>
			<DrawerFooter>
				<Button
					className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					disabled={!isValid || !isDirty}
					isLoading={isPendingCreate || isPendingUpdate}
					onClick={handleSubmit(onSubmit)}
					type="submit"
				>
					{selectedEvent ? 'Editar evento' : 'Criar evento'}
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
