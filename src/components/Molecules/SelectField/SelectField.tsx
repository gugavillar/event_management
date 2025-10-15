'use client'
import type { ComponentProps, ReactNode } from 'react'

import {
	HelperErrorText,
	Label,
	Select,
	type SelectProps,
} from '@/components/Atoms'
import { get } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

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
				control={control}
				name={fieldName}
				render={({ field }) => (
					<Select
						id={fieldName}
						isInvalid={!!error?.message}
						options={options}
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
