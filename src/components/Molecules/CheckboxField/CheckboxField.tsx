'use client'
import { get } from 'lodash'
import { ComponentProps, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { Checkbox, HelperErrorText } from '@/components/Atoms'

type CheckboxFieldProps = ComponentProps<'input'> & {
	fieldName: string
	label: string | ReactNode
	fieldClassName?: string
}

export const CheckboxField = ({
	fieldName,
	label,
	fieldClassName,
	...props
}: CheckboxFieldProps) => {
	const { register, formState } = useFormContext()
	const error = get(formState.errors, fieldName)

	return (
		<div className={twMerge('w-full', fieldClassName)}>
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
