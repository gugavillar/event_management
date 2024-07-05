import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '@/components/Atoms'
import { HeaderPage } from '@/components/Molecules'

type PageContentProps = ComponentProps<'div'> & {
	subheadingPage: string
}

export const PageContent = ({
	className,
	children,
	subheadingPage,
	...props
}: PageContentProps) => {
	return (
		<>
			<HeaderPage>
				<Text className="opacity-50">{subheadingPage}</Text>
			</HeaderPage>
			<div className={twMerge('w-full space-y-8 p-12', className)} {...props}>
				{children}
			</div>
		</>
	)
}
