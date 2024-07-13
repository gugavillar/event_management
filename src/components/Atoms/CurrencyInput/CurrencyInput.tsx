import { forwardRef, ReactNode } from 'react'
import {
	NumberFormatBase,
	type NumberFormatBaseProps,
} from 'react-number-format'

import { currencyFieldValue } from '@/formatters'

import { Field } from '../Field'

type CurrencyInputProps = Omit<
	NumberFormatBaseProps,
	'customInput' | 'format'
> & {
	isInvalid?: boolean
	rightIcon?: ReactNode
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
	({ ...props }, ref) => {
		const format = (value: string) => currencyFieldValue(value)

		return (
			<NumberFormatBase
				getInputRef={ref}
				{...props}
				format={format}
				customInput={Field}
			/>
		)
	},
)

CurrencyInput.displayName = 'CurrencyInput'
