import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type SpinnerProps = ComponentProps<'div'>

export const Spinner = ({ className, ...props }: SpinnerProps) => {
	return (
		<div
			className={twMerge(
				'inline-block size-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500',
				className,
			)}
			role="status"
			aria-label="loading"
			data-testid="spinner"
			{...props}
		>
			<span className="sr-only">Loading...</span>
		</div>
	)
}
