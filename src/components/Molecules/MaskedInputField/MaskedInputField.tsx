'use client'
import { useFormContext } from 'react-hook-form'

import { HelperErrorText, Label, MaskedInput } from '@/components/Atoms'

type MaskedInputFieldProps = {
	children: string
	fieldName: string
	format: string
}

export const MaskedInputField = ({
	children,
	fieldName,
	format,
}: MaskedInputFieldProps) => {
	const { register, formState } = useFormContext()

	return (
		<div>
			<Label htmlFor={fieldName}>{children}</Label>
			<MaskedInput
				format={format}
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
