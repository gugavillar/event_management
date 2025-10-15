import { type ComponentPropsWithRef, forwardRef, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type CheckboxProps = ComponentPropsWithRef<'input'> & {
	isInvalid?: boolean
	label: string | ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ isInvalid, label, className, ...props }, ref) => {
		return (
			<div
				className={twMerge(
					'flex',
					props.disabled && 'pointer-events-none opacity-50',
					className
				)}
			>
				<input
					className={twMerge(
						'mt-0.5 shrink-0 rounded-sm border-gray-500 text-blue-600 checked:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50',
						className,
						isInvalid &&
							'border-red-500 focus:border-red-500 focus:ring-red-500'
					)}
					ref={ref}
					type="checkbox"
					{...props}
				/>
				<label className="ms-3 text-sm" htmlFor={props.id}>
					{label}
				</label>
			</div>
		)
	}
)

Checkbox.displayName = 'Checkbox'
