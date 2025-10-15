import { type ComponentProps, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '@/components/Atoms'
import { HeaderPage } from '@/components/Molecules'

type PageContentProps = ComponentProps<'div'> & {
	subheadingPage: string
	pageTitle?: string
}

export const PageContent = ({
	className,
	children,
	subheadingPage,
	pageTitle,
	...props
}: PageContentProps) => {
	const memoSubheadingPage = useMemo(
		() => <Text className="opacity-50">{subheadingPage}</Text>,
		[subheadingPage]
	)
	return (
		<>
			<HeaderPage pageTitle={pageTitle}>{memoSubheadingPage}</HeaderPage>
			<div
				className={twMerge(
					'flex w-full flex-col space-y-8 px-6 py-12',
					className
				)}
				{...props}
			>
				{children}
			</div>
		</>
	)
}
