import { ComponentProps, forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type FieldProps = ComponentProps<'input'> & {
	isInvalid?: boolean
	rightIcon?: ReactNode
}

const Warning = () => {
	return (
		<div
			className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3"
			data-testid="warning-icon"
		>
			<svg
				className="size-4 flex-shrink-0 text-red-500"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<line x1="12" x2="12" y1="8" y2="12"></line>
				<line x1="12" x2="12.01" y1="16" y2="16"></line>
			</svg>
		</div>
	)
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
	({ isInvalid, className, rightIcon, ...props }, ref) => {
		return (
			<div className="relative">
				<input
					className={twMerge(
						'block w-full rounded-lg py-3 pl-4 pr-8 text-sm',
						className,
						isInvalid &&
							'border-red-500 focus:border-red-500 focus:ring-red-500',
					)}
					ref={ref}
					{...props}
				/>
				{rightIcon ? (
					<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
						{rightIcon}
					</div>
				) : null}
				{isInvalid ? <Warning /> : null}
			</div>
		)
	},
)

Field.displayName = 'Field'
