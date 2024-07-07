import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type DrawerBodyProps = ComponentProps<'section'>

export const DrawerBody = ({
	className,
	children,
	...props
}: DrawerBodyProps) => {
	return (
		<section
			className={twMerge(
				'max-h-[calc(88dvh-4rem)] space-y-6 overflow-y-auto p-6',
				className,
			)}
			{...props}
		>
			{children}
		</section>
	)
}
