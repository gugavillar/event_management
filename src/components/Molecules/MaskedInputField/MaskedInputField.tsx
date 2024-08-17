'use client'
import { useFormContext } from 'react-hook-form'

import { HelperErrorText, Label, MaskedInput } from '@/components/Atoms'

import type { PatternFormatProps } from 'react-number-format'

type MaskedInputFieldProps = Omit<PatternFormatProps, 'customInput'> & {
	children: string
	fieldName: string
	format: string
}

export const MaskedInputField = ({
	children,
	fieldName,
	format,
	...props
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
				{...props}
			/>
			{formState.errors[fieldName] ? (
				<HelperErrorText className="text-red-500">
					{formState.errors[fieldName].message as string}
				</HelperErrorText>
			) : null}
		</div>
	)
}
