'use client'
import { useFormContext } from 'react-hook-form'

import { HelperErrorText, Label, Select, SelectProps } from '@/components/Atoms'

type SelectFieldProps = {
	children: string
	fieldName: string
	options: SelectProps['options']
	placeholder?: SelectProps['placeholder']
}

export const SelectField = ({
	children,
	fieldName,
	options,
	placeholder,
}: SelectFieldProps) => {
	const { register, formState } = useFormContext()

	return (
		<div>
			<Label htmlFor={fieldName}>{children}</Label>
			<Select
				options={options}
				id={fieldName}
				{...register(fieldName)}
				isInvalid={!!formState?.errors?.[fieldName]?.message}
				placeholder={placeholder}
			/>
			{formState.errors[fieldName] ? (
				<HelperErrorText className="text-red-500">
					{formState.errors[fieldName].message as string}
				</HelperErrorText>
			) : null}
		</div>
	)
}
