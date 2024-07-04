import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type AvatarProps = ComponentProps<'span'> & {
	children: string
}

export const Avatar = ({ className, children, ...props }: AvatarProps) => {
	const letters =
		children.length > 2
			? children.slice(0, 2).toUpperCase()
			: children.toUpperCase()
	return (
		<span
			className={twMerge(
				'inline-flex size-12 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold leading-none text-gray-800',
				className,
			)}
			{...props}
		>
			{letters}
		</span>
	)
}
