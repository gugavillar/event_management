'use client'
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
	InputField,
	SelectField,
	FieldArrayContainerWithAppendButton,
} from '@/components/Molecules'

import { GroupSchemaType } from './GroupDrawer.schema'

type GroupDrawerProps = {
	drawerId: string
	leaders: SelectProps['options']
}

export const GroupDrawer = ({ drawerId, leaders }: GroupDrawerProps) => {
	const { handleSubmit, register, formState } =
		useFormContext<GroupSchemaType>()
	const { fields, append, remove } = useFieldArray({
		name: 'participants',
	})

	const onSubmit: SubmitHandler<GroupSchemaType> = (values) => {
		console.log(values)
	}

	return (
		<Drawer drawerId={drawerId} headingTitle="Novo grupo">
			<DrawerBody>
				<InputField fieldName="name">Nome do grupo</InputField>
				<SelectField
					fieldName="event"
					options={leaders}
					placeholder="Selecione o evento"
				>
					Evento
				</SelectField>
				<SelectField
					fieldName="leader"
					options={leaders}
					placeholder="Selecione o líder do grupo"
				>
					Líder do grupo
				</SelectField>
				<FieldArrayContainerWithAppendButton
					handleAppendField={() => append({ selected: '' })}
					leftIcon={<FiUserPlus size={18} />}
				>
					{fields.map((field, index) => (
						<div key={field.id} {...(!index && { style: { marginTop: 0 } })}>
							<Label htmlFor={`participants.${index}.selected`}>
								<div className="flex items-center justify-between">
									Participante
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
								isInvalid={!!formState.errors.participants?.[index]?.selected}
								id={`participants.${index}.selected`}
								options={leaders}
								{...register(`participants.${index}.selected` as const)}
							/>
							{formState.errors.participants?.[index]?.selected && (
								<HelperErrorText>
									{formState.errors.participants?.[index]?.selected?.message}
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
					Criar grupo
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
