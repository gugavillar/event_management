import { forwardRef } from 'react'
import { PatternFormat, type PatternFormatProps } from 'react-number-format'

import { Field } from '../Field'

type MaskedInputProps = Omit<PatternFormatProps, 'customInput'> & {
	isInvalid?: boolean
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
	({ ...props }, ref) => {
		return <PatternFormat getInputRef={ref} {...props} customInput={Field} />
	},
)

MaskedInput.displayName = 'MaskedInput'
