'use client'
import { useFormContext } from 'react-hook-form'
import { type NumberFormatBaseProps } from 'react-number-format'

import { HelperErrorText, Label, CurrencyInput } from '@/components/Atoms'

type CurrencyInputFieldProps = Omit<
	NumberFormatBaseProps,
	'customInput' | 'format'
> & {
	children: string
	fieldName: string
}

export const CurrencyInputField = ({
	children,
	fieldName,
	...props
}: CurrencyInputFieldProps) => {
	const { register, formState } = useFormContext()

	return (
		<div>
			<Label htmlFor={fieldName}>{children}</Label>
			<CurrencyInput
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
