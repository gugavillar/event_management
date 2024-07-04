import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type LinkProps = NextLinkProps & {
	className?: string
	children?: ReactNode
}

export const Link = ({ href, className, children, ...props }: LinkProps) => {
	return (
		<NextLink
			href={href}
			className={twMerge(
				'inline-flex items-center gap-x-2 text-lg font-medium text-gray-800',
				className,
			)}
			{...props}
		>
			{children}
		</NextLink>
	)
}
