'use client'
import type { ComponentProps } from 'react'

import { Field, HelperErrorText, Label } from '@/components/Atoms'
import { get } from 'lodash'
import { useFormContext } from 'react-hook-form'

type InputFieldProps = ComponentProps<'input'> & {
	children: string
	fieldName: string
}

export const InputField = ({
	children,
	fieldName,
	...props
}: InputFieldProps) => {
	const { register, formState } = useFormContext()
	const error = get(formState.errors, fieldName)

	return (
		<div className="w-full">
			<Label htmlFor={fieldName}>{children}</Label>
			<Field
				id={fieldName}
				{...register(fieldName)}
				isInvalid={!!error?.message}
				{...props}
			/>
			{error?.message ? (
				<HelperErrorText className="text-red-500">
					{error?.message as string}
				</HelperErrorText>
			) : null}
		</div>
	)
}
