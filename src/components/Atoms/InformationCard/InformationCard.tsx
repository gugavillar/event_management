import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '@/components/Atoms'

type InformationCardProps = ComponentProps<'div'> & {
	headingText: string
	actionButton?: ReactNode
}

export const InformationCard = ({
	className,
	headingText,
	children,
	actionButton,
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
			<div className="flex items-center justify-between rounded-t-xl border-b bg-gray-100 px-4 py-2">
				<Text className="opacity-50">{headingText}</Text>
				{actionButton}
			</div>
			{children}
		</div>
	)
}
