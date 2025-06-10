'use client'
import { get } from 'lodash'
import { ComponentProps, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { HelperErrorText, Label, Select, SelectProps } from '@/components/Atoms'

type SelectFieldProps = ComponentProps<'div'> & {
	children: ReactNode
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
	const error = get(formState.errors, fieldName)

	return (
		<div className="w-full">
			<Label htmlFor={fieldName}>{children}</Label>
			<Controller
				name={fieldName}
				control={control}
				render={({ field }) => (
					<Select
						options={options}
						id={fieldName}
						isInvalid={!!error?.message}
						placeholder={placeholder}
						{...field}
					/>
				)}
			/>
			{error?.message ? (
				<HelperErrorText className="text-red-500">
					{error?.message as string}
				</HelperErrorText>
			) : null}
		</div>
	)
}
