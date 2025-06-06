'use client'
import { get } from 'lodash'
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

	const error = get(formState.errors, fieldName)
	return (
		<div>
			<Label>{children}</Label>
			<Radio
				options={options}
				{...register(fieldName)}
				isInvalid={!!error?.message}
				position={position}
				fieldName={fieldName}
			/>
			{error?.message ? (
				<HelperErrorText className="text-red-500">
					{error?.message as string}
				</HelperErrorText>
			) : null}
		</div>
	)
}
