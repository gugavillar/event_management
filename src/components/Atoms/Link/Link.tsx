import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type LinkProps = NextLinkProps & {
	className?: string
	children?: ReactNode
}

export const Link = ({ href, className, children, ...props }: LinkProps) => {
	return (
		<NextLink
			className={twMerge('inline-flex items-center gap-x-2 text-lg font-medium text-gray-800', className)}
			href={href}
			{...props}
		>
			{children}
		</NextLink>
	)
}
