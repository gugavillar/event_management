'use client'
import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/Atoms'

type FieldArrayContainerWithAppendButtonProps = ComponentProps<'div'> & {
	children: ReactNode
	leftIcon: ReactNode
	handleAppendField: () => void
	label: string
}

export const FieldArrayContainerWithAppendButton = ({
	children,
	handleAppendField,
	leftIcon,
	label,
	...props
}: FieldArrayContainerWithAppendButtonProps) => {
	return (
		<div className={twMerge('flex flex-col space-y-6', props.className)}>
			{children}
			<Button
				className="ml-auto self-end rounded-full border-none p-2 transition-colors duration-500 hover:bg-green-100 hover:text-gray-800"
				leftIcon={leftIcon}
				onClick={handleAppendField}
			>
				{label}
			</Button>
		</div>
	)
}
