'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	InputField,
	SelectField,
	MaskedInputField,
} from '@/components/Molecules'
import { GenderType, GenderTypeAPI } from '@/constants'

type EventDrawerProps = {
	drawerId: string
}

export const EventDrawer = ({ drawerId }: EventDrawerProps) => {
	const methods = useForm()

	return (
		<Drawer drawerId={drawerId} headingTitle="Novo evento">
			<DrawerBody>
				<FormProvider {...methods}>
					<InputField fieldName="eventName">Nome do evento</InputField>
					<SelectField
						fieldName="eventGender"
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
					<MaskedInputField format="##/##/####" fieldName="eventInitialDate">
						Data de início do evento
					</MaskedInputField>
					<MaskedInputField format="##/##/####" fieldName="eventFinalDate">
						Data de término do evento
					</MaskedInputField>
				</FormProvider>
			</DrawerBody>
			<DrawerFooter>
				<Button className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800">
					Criar evento
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
