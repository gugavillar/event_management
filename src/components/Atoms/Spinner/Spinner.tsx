import { LoaderCircle } from 'lucide-react'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type SpinnerProps = ComponentProps<'svg'>

export const Spinner = ({ className, ...props }: SpinnerProps) => {
	return (
		<>
			<span className="sr-only">Loading...</span>
			<LoaderCircle className={twMerge('size-8 animate-spin', className)} {...props} />
		</>
	)
}
