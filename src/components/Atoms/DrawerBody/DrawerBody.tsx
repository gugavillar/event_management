import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Spinner } from '../Spinner'

type DrawerBodyProps = ComponentProps<'section'> & {
	isLoading?: boolean
}

const loadingClasses = 'flex flex-col h-full items-center justify-center'

export const DrawerBody = ({
	className,
	children,
	isLoading,
	...props
}: DrawerBodyProps) => {
	return (
		<section
			className={twMerge(
				'h-full max-h-[calc(88dvh-4rem)] space-y-6 overflow-y-auto p-6',
				isLoading && loadingClasses,
				className,
			)}
			{...props}
		>
			{isLoading ? <Spinner data-testid="loading-spinner" /> : children}
		</section>
	)
}
