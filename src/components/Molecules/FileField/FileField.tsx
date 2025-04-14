'use client'
import { useFormContext } from 'react-hook-form'

import { FileInput, HelperErrorText, Label } from '@/components/Atoms'

type FileFieldProps = {
	children: string
	fieldName: string
}

export const FileField = ({ children, fieldName }: FileFieldProps) => {
	const { formState, register } = useFormContext()
	return (
		<div className="w-full">
			<Label htmlFor={fieldName}>{children}</Label>
			<FileInput
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
