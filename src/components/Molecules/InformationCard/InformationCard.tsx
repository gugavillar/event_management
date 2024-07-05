import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Header, Text } from '@/components/Atoms'

type InformationCardProps = ComponentProps<'div'> & {
	headingText: string
	subheadingText: string
}

export const InformationCard = ({
	className,
	headingText,
	subheadingText,
	...props
}: InformationCardProps) => {
	return (
		<div
			className={twMerge(
				'flex flex-col rounded-xl border bg-white shadow-sm',
				className,
			)}
			{...props}
		>
			<div className="rounded-t-xl border-b bg-gray-100 px-4 py-3 md:px-5 md:py-4">
				<Text className="opacity-50">{headingText}</Text>
			</div>
			<div className="p-4 md:p-5">
				<Header as="h3" className="text-5xl">
					{subheadingText}
				</Header>
			</div>
		</div>
	)
}
