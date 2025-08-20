import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Spinner, SpinnerProps } from '../Spinner'

type ButtonProps = ComponentProps<'button'> & {
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	isLoading?: boolean
	spinnerProps?: SpinnerProps
}

export const Button = ({
	children,
	className,
	leftIcon = null,
	rightIcon = null,
	isLoading,
	spinnerProps,
	...props
}: ButtonProps) => {
	return (
		<button
			className={twMerge(
				'inline-flex items-center gap-x-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold disabled:pointer-events-none disabled:opacity-50',
				className,
			)}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? (
				<Spinner data-testid="loading-spinner" {...spinnerProps} />
			) : (
				leftIcon
			)}
			{children}
			{rightIcon}
		</button>
	)
}
