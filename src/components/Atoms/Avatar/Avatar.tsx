import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { generateLettersAvatar } from './Avatar.utils'

type AvatarProps = ComponentProps<'span'> & {
	children: string
}

export const Avatar = ({ className, children, ...props }: AvatarProps) => {
	const letters = generateLettersAvatar(children)

	return (
		<span
			className={twMerge(
				'inline-flex size-8 min-w-8 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-800 text-xs leading-none',
				className
			)}
			{...props}
		>
			{letters}
		</span>
	)
}
