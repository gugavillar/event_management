import { LoaderCircle } from 'lucide-react'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type SpinnerProps = ComponentProps<'div'>

export const Spinner = ({ className }: SpinnerProps) => {
	return <LoaderCircle className={twMerge('size-8 animate-spin', className)} />
}
