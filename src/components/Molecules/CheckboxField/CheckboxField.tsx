'use client'
import { get } from 'lodash'
import { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'

import { Checkbox, HelperErrorText } from '@/components/Atoms'

type CheckboxFieldProps = ComponentProps<'input'> & {
	fieldName: string
	label: string
}

export const CheckboxField = ({
	fieldName,
	label,
	...props
}: CheckboxFieldProps) => {
	const { register, formState } = useFormContext()
	const error = get(formState.errors, fieldName)

	return (
		<div className="w-full">
			<Checkbox
				label={label}
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
