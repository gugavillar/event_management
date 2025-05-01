import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type AlertProps = ComponentProps<'div'> & {
	description: string
}

export const Alert = ({ className, description, ...props }: AlertProps) => {
	return (
		<div
			className={twMerge(
				'mt-2 rounded-lg border border-blue-200 bg-blue-100 p-4 text-sm text-blue-800',
				className,
			)}
			role="alert"
			aria-labelledby="hs-soft-color-info-label"
			{...props}
		>
			<span id="hs-soft-color-info-label" className="font-bold">
				Informação{' '}
			</span>
			{description}
		</div>
	)
}
