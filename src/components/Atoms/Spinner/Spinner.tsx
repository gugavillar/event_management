import { ComponentProps } from 'react'
import { LiaSpinnerSolid } from 'react-icons/lia'
import { twMerge } from 'tailwind-merge'

export type SpinnerProps = ComponentProps<'div'>

export const Spinner = ({ className }: SpinnerProps) => {
	return (
		<LiaSpinnerSolid className={twMerge('size-8 animate-spin', className)} />
	)
}
