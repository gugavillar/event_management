'use client'
import { SubmitHandler, useFormContext } from 'react-hook-form'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	InputField,
	SelectField,
	MaskedInputField,
	CurrencyInputField,
} from '@/components/Molecules'
import { GenderType, GenderTypeAPI } from '@/constants'

import { EventSchemaType } from './EventDrawer.schema'

type EventDrawerProps = {
	drawerId: string
}

export const EventDrawer = ({ drawerId }: EventDrawerProps) => {
	const { handleSubmit } = useFormContext<EventSchemaType>()

	const onSubmit: SubmitHandler<EventSchemaType> = (values) => {
		console.log(values)
	}

	return (
		<Drawer drawerId={drawerId} headingTitle="Novo evento">
			<DrawerBody>
				<InputField fieldName="name">Nome do evento</InputField>
				<SelectField
					fieldName="gender"
					placeholder="Selecione o gênero do evento"
					options={[
						{
							label: GenderType[GenderTypeAPI.MALE].label,
							value: GenderTypeAPI.MALE,
						},
						{
							label: GenderType[GenderTypeAPI.FEMALE].label,
							value: GenderTypeAPI.FEMALE,
						},
						{
							label: GenderType[GenderTypeAPI.BOTH].label,
							value: GenderTypeAPI.BOTH,
						},
					]}
				>
					Gênero do evento
				</SelectField>
				<CurrencyInputField fieldName="participantValue">
					Valor ficha participante
				</CurrencyInputField>
				<CurrencyInputField fieldName="volunteerValue">
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
				>
					Criar evento
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
