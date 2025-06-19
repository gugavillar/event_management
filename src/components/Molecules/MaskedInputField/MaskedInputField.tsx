'use client'
import { get } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

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
	const { control, formState } = useFormContext()
	const error = get(formState.errors, fieldName)

	return (
		<div className="w-full">
			<Label htmlFor={fieldName}>{children}</Label>
			<Controller
				name={fieldName}
				control={control}
				render={({ field }) => (
					<MaskedInput
						format={format}
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
