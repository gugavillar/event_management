import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type CheckboxProps = ComponentProps<'input'>

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div className="flex" data-testid="checkbox-container">
				<input
					type="checkbox"
					className={twMerge(
						'mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50',
						className,
					)}
					ref={ref}
					{...props}
				/>
				{children}
			</div>
		)
	},
)

Checkbox.displayName = 'Checkbox'
