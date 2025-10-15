import { forwardRef, type ReactNode } from 'react'

import { currencyFieldValue } from '@/formatters'
import {
	NumberFormatBase,
	type NumberFormatBaseProps,
} from 'react-number-format'
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
				customInput={Field}
				format={format}
				getInputRef={ref}
				{...props}
			/>
		)
	}
)

CurrencyInput.displayName = 'CurrencyInput'
