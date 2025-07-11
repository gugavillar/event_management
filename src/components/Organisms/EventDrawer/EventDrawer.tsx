'use client'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { type SubmitHandler, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	InputField,
	SelectField,
	MaskedInputField,
	CurrencyInputField,
} from '@/components/Molecules'
import { GenderSelectOptions, overlayClose } from '@/constants'
import { formatDateToSendToApi, removeCurrencyFormat } from '@/formatters'
import {
	useCreateEvent,
	useGetEvent,
	useUpdateEvent,
} from '@/services/queries/events'
import { EventsAPI, FormEvent } from '@/services/queries/events/event.type'
import { generateToastError } from '@/utils/errors'

import { EventSchemaType } from './EventDrawer.schema'

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
	const { handleSubmit, reset } = useFormContext<EventSchemaType>()
	const { create, isPending: isPendingCreate } = useCreateEvent()
	const { update, isPending: isPendingUpdate } = useUpdateEvent()
	const { data, isLoading } = useGetEvent(selectedEvent)

	const onSubmit: SubmitHandler<EventSchemaType> = async (values) => {
		if (!values) return

		const formattedValues = {
			...values,
			participantPrice: Number(removeCurrencyFormat(values.participantPrice)),
			volunteerPrice: Number(removeCurrencyFormat(values.volunteerPrice)),
			initialDate: formatDateToSendToApi(values.initialDate),
			finalDate: formatDateToSendToApi(values.finalDate),
		} as FormEvent

		if (selectedEvent) {
			return await update(
				{
					eventId: selectedEvent,
					data: formattedValues,
				},
				{
					onSuccess: () => {
						reset()
						setSelectedEvent(null)
						toast.success('Evento atualizado com sucesso!')
						overlayClose(drawerId)
					},
					onError: (error) =>
						generateToastError(error, 'Erro ao atualizar evento'),
				},
			)
		}
		await create(formattedValues, {
			onSuccess: () => {
				reset()
				toast.success('Evento criado com sucesso!')
				overlayClose(drawerId)
			},
			onError: (error) => generateToastError(error, 'Erro ao criar evento'),
		})
	}

	const handleClose = () => {
		reset()
		setSelectedEvent(null)
	}

	useEffect(() => {
		if (!data) return reset()
		reset({ ...data }, { keepDefaultValues: true })
	}, [data, reset])

	return (
		<Drawer
			drawerId={drawerId}
			headingTitle={selectedEvent ? 'Editar evento' : 'Novo evento'}
			handleClose={handleClose}
		>
			<DrawerBody isLoading={isLoading}>
				<InputField fieldName="name">Nome do evento</InputField>
				<SelectField
					fieldName="gender"
					placeholder="Selecione o gênero do evento"
					options={GenderSelectOptions}
				>
					Gênero do evento
				</SelectField>
				<CurrencyInputField
					type="tel"
					fieldName="participantPrice"
					value={data?.participantPrice}
				>
					Valor ficha participante
				</CurrencyInputField>
				<CurrencyInputField
					type="tel"
					fieldName="volunteerPrice"
					value={data?.volunteerPrice}
				>
					Valor ficha voluntário
				</CurrencyInputField>
				<MaskedInputField
					format="##/##/####"
					fieldName="initialDate"
					value={data?.initialDate}
				>
					Data de início do evento
				</MaskedInputField>
				<MaskedInputField
					format="##/##/####"
					fieldName="finalDate"
					value={data?.finalDate}
				>
					Data de término do evento
				</MaskedInputField>
			</DrawerBody>
			<DrawerFooter>
				<Button
					className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					onClick={handleSubmit(onSubmit)}
					type="submit"
					isLoading={isPendingCreate || isPendingUpdate}
					disabled={isPendingCreate || isPendingCreate || isLoading}
				>
					{selectedEvent ? 'Editar evento' : 'Criar evento'}
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
