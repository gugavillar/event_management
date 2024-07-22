'use client'

import { useEffect } from 'react'
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form'
import { FiUserPlus } from 'react-icons/fi'

import {
	Button,
	Drawer,
	DrawerBody,
	DrawerFooter,
	HelperErrorText,
	Label,
	Select,
	SelectProps,
} from '@/components/Atoms'
import {
	FieldArrayContainerWithAppendButton,
	MaskedInputField,
	RadioField,
	SelectField,
} from '@/components/Molecules'
import {
	CollaboratorTypeAPI,
	CollaboratorTypeSelectOptions,
	GenderSelectOptions,
	TrueOrFalseAPI,
	TrueOrFalseRadioOptions,
} from '@/constants'

import { RoomSchemaType } from './RoomDrawer.schema'

type RoomDrawerProps = {
	drawerId: string
	leaders: SelectProps['options']
}

export const RoomDrawer = ({ drawerId, leaders }: RoomDrawerProps) => {
	const { watch, formState, register, handleSubmit, unregister, trigger } =
		useFormContext<RoomSchemaType>()
	const { fields, append, remove } = useFieldArray({
		name: 'collaborators',
	})

	const onSubmit: SubmitHandler<RoomSchemaType> = (values) => {
		console.log(values)
	}

	const hasLeaderRoom = watch('need') === TrueOrFalseAPI.TRUE
	const isNecessaryLeader = watch('type') === CollaboratorTypeAPI.PARTICIPANT

	useEffect(() => {
		if (!hasLeaderRoom) {
			unregister('leader')
		}
		if (!isNecessaryLeader) {
			unregister('need')
		}
		if (fields.length >= 3) {
			trigger('collaborators')
		}
	}, [hasLeaderRoom, unregister, isNecessaryLeader, fields.length, trigger])

	return (
		<Drawer drawerId={drawerId} headingTitle="Novo quarto">
			<DrawerBody>
				<SelectField
					fieldName="event"
					options={[
						{
							label: 'Evento 1',
							value: '8b31d150-8410-4c4d-8761-0f91dcd32a56',
						},
						{
							label: 'Evento 2',
							value: '7b7f3bf6-100c-4c45-b4c9-1eca3c10ac5e',
						},
					]}
					placeholder="Selecione o evento"
				>
					Evento
				</SelectField>
				<SelectField
					fieldName="gender"
					options={GenderSelectOptions}
					placeholder="Selecione o gênero do quarto"
				>
					Gênero
				</SelectField>
				<SelectField
					fieldName="type"
					options={CollaboratorTypeSelectOptions}
					placeholder="Selecione o tipo do quarto"
				>
					Tipo (Voluntários ou Participantes)
				</SelectField>
				{isNecessaryLeader ? (
					<RadioField options={TrueOrFalseRadioOptions} fieldName="need">
						Necessário líder no quarto
					</RadioField>
				) : null}
				<MaskedInputField format="##" fieldName="roomNumber">
					Número do quarto
				</MaskedInputField>
				{hasLeaderRoom ? (
					<SelectField
						fieldName="leader"
						options={leaders}
						placeholder="Selecione o líder do quarto"
					>
						Líder
					</SelectField>
				) : null}
				<FieldArrayContainerWithAppendButton
					handleAppendField={() => append({ selected: '' })}
					leftIcon={<FiUserPlus size={18} />}
				>
					{fields.map((field, index) => (
						<div key={field.id} {...(!index && { style: { marginTop: 0 } })}>
							<Label htmlFor={`collaborators.${index}.selected`}>
								<div className="flex items-center justify-between">
									Colaborador
									{index ? (
										<Button
											className="border-none px-2 py-0 text-red-500 transition-colors duration-500 hover:bg-red-100 hover:text-red-800"
											onClick={() => remove(index)}
										>
											Remover
										</Button>
									) : null}
								</div>
							</Label>
							<Select
								isInvalid={!!formState.errors.collaborators?.[index]?.selected}
								id={`collaborators.${index}.selected`}
								options={leaders}
								{...register(`collaborators.${index}.selected` as const)}
							/>
							{formState.errors.collaborators?.[index]?.selected && (
								<HelperErrorText>
									{formState.errors.collaborators?.[index]?.selected?.message}
								</HelperErrorText>
							)}
						</div>
					))}
				</FieldArrayContainerWithAppendButton>
			</DrawerBody>
			<DrawerFooter>
				<Button
					className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					onClick={handleSubmit(onSubmit)}
				>
					Criar quarto
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
