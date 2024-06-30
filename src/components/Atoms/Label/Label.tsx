import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Label = ({
	className,
	children,
	...props
}: ComponentProps<'label'>) => {
	return (
		<label
			className={twMerge('mb-2 block text-sm font-medium', className)}
			{...props}
		>
			{children}
		</label>
	)
}
