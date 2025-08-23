import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '@/components/Atoms'

type InformationCardProps = ComponentProps<'div'> & {
	headingText: string
	actionButton?: ReactNode
	headerClassName?: string
}

export const InformationCard = ({
	className,
	headingText,
	children,
	actionButton,
	headerClassName,
	...props
}: InformationCardProps) => {
	return (
		<div
			className={twMerge(
				'flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm',
				className,
			)}
			{...props}
		>
			<div
				className={twMerge(
					'flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-100 px-4 py-2',
					headerClassName,
				)}
			>
				<Text className="opacity-50">{headingText}</Text>
				{actionButton}
			</div>
			{children}
		</div>
	)
}
