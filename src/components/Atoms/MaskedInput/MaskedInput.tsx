import { forwardRef, ReactNode } from 'react'
import { PatternFormat, type PatternFormatProps } from 'react-number-format'

import { Field } from '../Field'

type MaskedInputProps = Omit<PatternFormatProps, 'customInput'> & {
	isInvalid?: boolean
	rightIcon?: ReactNode
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
	({ ...props }, ref) => {
		return <PatternFormat getInputRef={ref} {...props} customInput={Field} />
	},
)

MaskedInput.displayName = 'MaskedInput'
