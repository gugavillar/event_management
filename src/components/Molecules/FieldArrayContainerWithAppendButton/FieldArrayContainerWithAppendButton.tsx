'use client'
import { ReactNode } from 'react'

import { Button } from '@/components/Atoms'

type FieldArrayContainerWithAppendButtonProps = {
	children: ReactNode
	leftIcon: ReactNode
	handleAppendField: () => void
}

export const FieldArrayContainerWithAppendButton = ({
	children,
	handleAppendField,
	leftIcon,
}: FieldArrayContainerWithAppendButtonProps) => {
	return (
		<div className="flex flex-col space-y-3">
			<Button
				className="ml-auto self-end rounded-full border-none p-2 transition-colors duration-500 hover:bg-green-100 hover:text-gray-800"
				leftIcon={leftIcon}
				onClick={handleAppendField}
			/>
			{children}
		</div>
	)
}
