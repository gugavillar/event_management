import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Spinner, Text } from '@/components/Atoms'
import { HeaderPage } from '@/components/Molecules'

type PageContentProps = ComponentProps<'div'> & {
	subheadingPage: string
	isLoading?: boolean
}

const loadingClasses =
	'flex h-[calc(100dvh-7.5rem)] flex-col items-center justify-center'

export const PageContent = ({
	className,
	children,
	subheadingPage,
	isLoading,
	...props
}: PageContentProps) => {
	return (
		<>
			<HeaderPage>
				<Text className="opacity-50">{subheadingPage}</Text>
			</HeaderPage>
			<div
				className={twMerge(
					'w-full space-y-8 px-6 py-12',
					isLoading && loadingClasses,
					className,
				)}
				{...props}
			>
				{isLoading ? <Spinner /> : children}
			</div>
		</>
	)
}
