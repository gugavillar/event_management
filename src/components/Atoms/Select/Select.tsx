import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type SelectProps = ComponentPropsWithoutRef<'select'> & {
	isInvalid?: boolean
	placeholder?: string
	options: Array<{
		label: string
		value: string | number
		isDisabled?: boolean
	}>
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ options, className, isInvalid, placeholder, ...props }, ref) => {
		const hasOptions = options.length > 0

		return (
			<div className="relative w-full">
				<select
					className={twMerge(
						'block w-full rounded-lg px-4 py-3 pe-16 text-sm disabled:pointer-events-none disabled:opacity-50',
						className,
						isInvalid &&
							'border-red-500 focus:border-red-500 focus:ring-red-500',
					)}
					ref={ref}
					{...props}
				>
					{placeholder ? <option value="">{placeholder}</option> : null}
					{hasOptions &&
						options.map(({ label, value, isDisabled }) => (
							<option key={value} value={value} disabled={isDisabled}>
								{label}
							</option>
						))}
				</select>
			</div>
		)
	},
)

Select.displayName = 'Select'
