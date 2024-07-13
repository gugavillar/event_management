'use client'
import { useFormContext } from 'react-hook-form'

import { HelperErrorText, Label, CurrencyInput } from '@/components/Atoms'

type CurrencyInputFieldProps = {
	children: string
	fieldName: string
}

export const CurrencyInputField = ({
	children,
	fieldName,
}: CurrencyInputFieldProps) => {
	const { register, formState } = useFormContext()

	return (
		<div>
			<Label htmlFor={fieldName}>{children}</Label>
			<CurrencyInput
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
