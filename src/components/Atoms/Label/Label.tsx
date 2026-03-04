import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Label = ({ className, children, ...props }: ComponentProps<'label'>) => {
	return (
		<label className={twMerge('mb-2 block font-medium text-sm', className)} {...props}>
			{children}
		</label>
	)
}
