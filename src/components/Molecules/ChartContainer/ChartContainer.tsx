import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Header, Text } from '@/components/Atoms'

type ChartContainerProps = ComponentProps<'section'> & {
	headingText: string
	subheadingText?: string
}

export const ChartContainer = ({
	headingText,
	subheadingText,
	className,
	children,
	...props
}: ChartContainerProps) => {
	return (
		<section
			className={twMerge(
				'flex w-full flex-col space-y-4 rounded-lg bg-slate-800/5 p-8 shadow-lg',
				className,
			)}
			{...props}
		>
			<div>
				<Header>{headingText}</Header>
				{subheadingText ? (
					<Text className="opacity-50">{subheadingText}</Text>
				) : null}
			</div>
			{children}
		</section>
	)
}
