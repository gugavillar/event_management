import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type DrawerFooterProps = ComponentProps<'footer'>

export const DrawerFooter = ({
	className,
	children,
	...props
}: DrawerFooterProps) => {
	return (
		<footer
			className={twMerge(
				'absolute bottom-0 flex min-h-16 w-full flex-col items-center justify-between gap-y-2 px-6 pt-3 pb-6 md:flex-row md:gap-x-6',
				className
			)}
			{...props}
		>
			{children}
		</footer>
	)
}
