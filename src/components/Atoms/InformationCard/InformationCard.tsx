import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '@/components/Atoms'

type InformationCardProps = ComponentProps<'div'> & {
	headingText: string
}

export const InformationCard = ({
	className,
	headingText,
	children,
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
			<div className="rounded-t-xl border-b bg-gray-100 px-4 py-2">
				<Text className="opacity-50">{headingText}</Text>
			</div>
			{children}
		</div>
	)
}
