import { ComponentPropsWithRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type CheckboxProps = ComponentPropsWithRef<'input'> & {
	isInvalid?: boolean
	label: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ isInvalid, label, ...props }, ref) => {
		return (
			<div
				className={twMerge(
					'flex',
					props.disabled && 'pointer-events-none opacity-50',
					props.className,
				)}
			>
				<input
					type="checkbox"
					className="mt-0.5 shrink-0 rounded-sm border-gray-500 text-blue-600 checked:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
					ref={ref}
					{...props}
				/>
				<label htmlFor={props.id} className="ms-3 text-sm">
					{label}
				</label>
			</div>
		)
	},
)

Checkbox.displayName = 'Checkbox'
