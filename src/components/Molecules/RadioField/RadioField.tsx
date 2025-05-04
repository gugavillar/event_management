'use client'
import { useFormContext } from 'react-hook-form'

import { HelperErrorText, Label, Radio, RadioProps } from '@/components/Atoms'

type RadioFieldProps = {
	children: string
	fieldName: string
	options: RadioProps['options']
	position?: RadioProps['position']
}

export const RadioField = ({
	children,
	fieldName,
	options,
	position = 'column',
}: RadioFieldProps) => {
	const { register, formState } = useFormContext()

	return (
		<div>
			<Label htmlFor={fieldName}>{children}</Label>
			<Radio
				options={options}
				{...register(fieldName)}
				isInvalid={!!formState?.errors?.[fieldName]?.message}
				position={position}
			/>
			{formState.errors[fieldName] ? (
				<HelperErrorText className="text-red-500">
					{formState.errors[fieldName].message as string}
				</HelperErrorText>
			) : null}
		</div>
	)
}
