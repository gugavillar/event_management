'use client'
import {
	ArrayPath,
	Control,
	FieldArray,
	FieldValues,
	useFieldArray,
	useFormContext,
} from 'react-hook-form'
import { FiUserPlus } from 'react-icons/fi'

import { Button, Label, Select } from '@/components/Atoms'

type InputFieldArrayProps<T extends FieldValues> = {
	control: Control<T>
	name: ArrayPath<T>
	valueKey: string
	children: string
}

export const InputFieldArray = <T extends FieldValues>({
	control,
	name,
	children,
	valueKey,
}: InputFieldArrayProps<T>) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name,
	})

	const { register } = useFormContext()

	return (
		<div className="flex flex-col space-y-3">
			<Button
				onClick={() => append({ [valueKey]: '' } as FieldArray<T>)}
				className="ml-auto self-end rounded-full border-none p-2 transition-colors duration-500 hover:bg-green-100 hover:text-gray-800"
				leftIcon={<FiUserPlus size={18} />}
			/>
			{fields.map((field, index) => (
				<div key={field.id} {...(!index && { style: { marginTop: 0 } })}>
					<Label htmlFor={`${name}.${index}`}>
						<div className="flex items-center justify-between">
							{children}
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
						id={`${name}.${index}`}
						{...register(`${name}.${index}.${valueKey}`)}
						options={[{ label: 'teste', value: 'teste' }]}
					/>
				</div>
			))}
		</div>
	)
}
