import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type SelectProps = ComponentProps<'select'> & {
	isInvalid?: boolean
	placeholder?: string
	options: Array<{
		label: string
		value: string | number
		isDisabled?: boolean
	}>
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
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<line x1="12" x2="12" y1="8" y2="12"></line>
				<line x1="12" x2="12.01" y1="16" y2="16"></line>
			</svg>
		</div>
	)
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ options, className, isInvalid, placeholder, ...props }, ref) => {
		if (!options || !options.length) return null

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
					{options.map(({ label, value, isDisabled }) => (
						<option key={value} value={value} disabled={isDisabled}>
							{label}
						</option>
					))}
				</select>
				{isInvalid ? <Warning /> : null}
			</div>
		)
	},
)

Select.displayName = 'Select'
