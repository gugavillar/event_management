'use client'
import { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { HelperErrorText, Label, Select, SelectProps } from '@/components/Atoms'

type SelectFieldProps = ComponentProps<'div'> & {
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
	const { formState, control } = useFormContext()

	return (
		<div>
			<Label htmlFor={fieldName}>{children}</Label>
			<Controller
				name={fieldName}
				control={control}
				render={({ field }) => (
					<Select
						options={options}
						id={fieldName}
						isInvalid={!!formState?.errors?.[fieldName]?.message}
						placeholder={placeholder}
						{...field}
					/>
				)}
			/>
			{formState.errors[fieldName] ? (
				<HelperErrorText className="text-red-500">
					{formState.errors[fieldName].message as string}
				</HelperErrorText>
			) : null}
		</div>
	)
}
