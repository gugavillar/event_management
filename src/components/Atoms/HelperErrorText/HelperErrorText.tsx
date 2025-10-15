import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const HelperErrorText = ({ children, className, ...props }: ComponentProps<'p'>) => {
	return (
		<p className={twMerge('mt-2 text-sm text-red-600', className)} {...props}>
			{children}
		</p>
	)
}
