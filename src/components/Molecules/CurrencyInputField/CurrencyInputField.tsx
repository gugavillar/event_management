'use client'
import { Controller, useFormContext } from 'react-hook-form'
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
	const { control, formState } = useFormContext()

	return (
		<div className="w-full">
			<Label htmlFor={fieldName}>{children}</Label>
			<Controller
				name={fieldName}
				control={control}
				render={({ field }) => (
					<CurrencyInput
						id={fieldName}
						isInvalid={!!formState?.errors?.[fieldName]?.message}
						{...props}
						{...field}
					/>
				)}
			/>
			{formState.errors[fieldName] ? (
				<HelperErrorText className="text-red-500">
					{formState.errors[fieldName].message as string}
				</HelperErrorText>
			) : null}
		</div>
	)
}
