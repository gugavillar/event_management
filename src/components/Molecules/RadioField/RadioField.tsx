'use client'

import {
	HelperErrorText,
	Label,
	Radio,
	type RadioProps,
} from '@/components/Atoms'
import { get } from 'lodash'
import { useFormContext } from 'react-hook-form'

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
		<div className="w-full">
			<Label>{children}</Label>
			<Radio
				options={options}
				{...register(fieldName)}
				fieldName={fieldName}
				isInvalid={!!error?.message}
				position={position}
			/>
			{error?.message ? (
				<HelperErrorText className="text-red-500">
					{error?.message as string}
				</HelperErrorText>
			) : null}
		</div>
	)
}
