'use client'
import { get } from 'lodash'
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
	const error = get(formState.errors, fieldName)

	return (
		<div className="w-full">
			<Label htmlFor={fieldName}>{children}</Label>
			<Controller
				name={fieldName}
				control={control}
				render={({ field }) => (
					<CurrencyInput
						id={fieldName}
						isInvalid={!!error?.message}
						{...props}
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
