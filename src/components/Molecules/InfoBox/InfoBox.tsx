import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '@/components/Atoms'

type InfoBoxProps = ComponentProps<'div'> & {
	label: string
	value?: string
}

export const InfoBox = ({
	label,
	value,
	className,
	...props
}: InfoBoxProps) => {
	if (!value) return null

	return (
		<div className={twMerge('space-y-0.5 px-6', className)} {...props}>
			<Text className="opacity-50">{label}</Text>
			<Text>{value}</Text>
		</div>
	)
}
