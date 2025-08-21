import { TriangleAlert } from 'lucide-react'
import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type FieldProps = ComponentPropsWithRef<'input'> & {
	isInvalid?: boolean
	rightIcon?: ReactNode
}

const Warning = () => {
	return (
		<div
			className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3"
			data-testid="warning-icon"
		>
			<TriangleAlert className="size-4 shrink-0 text-red-500" />
		</div>
	)
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
	({ isInvalid, className, rightIcon, ...props }, ref) => {
		return (
			<div
				className={twMerge(
					'relative w-full',
					props.disabled && 'pointer-events-none opacity-50',
				)}
			>
				<input
					className={twMerge(
						'block w-full rounded-lg py-3 text-base',
						className,
						isInvalid &&
							'border-red-500 focus:border-red-500 focus:ring-red-500',
					)}
					ref={ref}
					{...props}
				/>
				{rightIcon ? (
					<div
						className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50"
						data-testid="right-icon"
					>
						{rightIcon}
					</div>
				) : null}
				{isInvalid ? <Warning /> : null}
			</div>
		)
	},
)

Field.displayName = 'Field'
