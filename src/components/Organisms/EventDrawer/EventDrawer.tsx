'use client'
import { parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	InputField,
	SelectField,
	MaskedInputField,
	CurrencyInputField,
} from '@/components/Molecules'
import { GenderSelectOptions, overlayClose } from '@/constants'
import { removeCurrencyFormat } from '@/formatters'
import { useCreateEvent } from '@/services/queries/events'

import { EventSchemaType } from './EventDrawer.schema'

type EventDrawerProps = {
	drawerId: string
}

export const EventDrawer = ({ drawerId }: EventDrawerProps) => {
	const { handleSubmit } = useFormContext<EventSchemaType>()
	const { create, isPending } = useCreateEvent()

	const onSubmit: SubmitHandler<EventSchemaType> = async (values) => {
		if (!values) return

		const formattedValues = {
			...values,
			participantPrice: Number(removeCurrencyFormat(values.participantPrice)),
			volunteerPrice: Number(removeCurrencyFormat(values.volunteerPrice)),
			initialDate: parse(values.initialDate, 'dd/MM/yyyy', new Date(), {
				locale: ptBR,
			}).toISOString(),
			finalDate: parse(values.finalDate, 'dd/MM/yyyy', new Date(), {
				locale: ptBR,
			}).toISOString(),
		}

		await create(formattedValues, {
			onSuccess: () => toast.success('Evento criado com sucesso!'),
			onError: () => toast.error('Erro ao criar evento'),
		})

		overlayClose(drawerId)
	}

	return (
		<Drawer drawerId={drawerId} headingTitle="Novo evento">
			<DrawerBody>
				<InputField fieldName="name">Nome do evento</InputField>
				<SelectField
					fieldName="gender"
					placeholder="Selecione o gênero do evento"
					options={GenderSelectOptions}
				>
					Gênero do evento
				</SelectField>
				<CurrencyInputField fieldName="participantPrice">
					Valor ficha participante
				</CurrencyInputField>
				<CurrencyInputField fieldName="volunteerPrice">
					Valor ficha voluntário
				</CurrencyInputField>
				<MaskedInputField format="##/##/####" fieldName="initialDate">
					Data de início do evento
				</MaskedInputField>
				<MaskedInputField format="##/##/####" fieldName="finalDate">
					Data de término do evento
				</MaskedInputField>
			</DrawerBody>
			<DrawerFooter>
				<Button
					className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					onClick={handleSubmit(onSubmit)}
					type="submit"
					isLoading={isPending}
					disabled={isPending}
				>
					Criar evento
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
