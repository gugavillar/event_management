import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = ComponentProps<'button'> & {
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	isLoading?: boolean
	loadingColor?: string
}

const LoadingSpinner = ({ loadingColor }: ButtonProps) => {
	return (
		<span
			className={twMerge(
				'inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white',
				loadingColor,
			)}
			role="status"
			aria-label="loading"
			data-testid="loading-spinner"
		>
			<span className="sr-only">Loading...</span>
		</span>
	)
}

export const Button = ({
	children,
	className,
	leftIcon = null,
	rightIcon = null,
	loadingColor,
	isLoading,
	...props
}: ButtonProps) => {
	return (
		<button
			className={twMerge(
				'inline-flex items-center gap-x-2 rounded-lg border px-4 py-3 text-sm font-semibold disabled:pointer-events-none disabled:opacity-50',
				className,
			)}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? <LoadingSpinner loadingColor={loadingColor} /> : leftIcon}
			{children}
			{rightIcon}
		</button>
	)
}
