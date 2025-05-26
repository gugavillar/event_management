import { ComponentProps } from 'react'
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
				'inline-flex size-12 min-w-12 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold leading-none text-gray-800',
				className,
			)}
			{...props}
		>
			{letters}
		</span>
	)
}
