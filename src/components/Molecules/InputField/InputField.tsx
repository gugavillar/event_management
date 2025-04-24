'use client'
import { useFormContext } from 'react-hook-form'

import { Field, HelperErrorText, Label } from '@/components/Atoms'

type InputFieldProps = {
	children: string
	fieldName: string
}

export const InputField = ({ children, fieldName }: InputFieldProps) => {
	const { register, formState } = useFormContext()

	return (
		<div className="w-full">
			<Label htmlFor={fieldName}>{children}</Label>
			<Field
				id={fieldName}
				{...register(fieldName)}
				isInvalid={!!formState?.errors?.[fieldName]?.message}
			/>
			{formState.errors[fieldName] ? (
				<HelperErrorText className="text-red-500">
					{formState.errors[fieldName].message as string}
				</HelperErrorText>
			) : null}
		</div>
	)
}
