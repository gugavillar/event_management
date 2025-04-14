import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type FileInputProps = ComponentProps<'input'> & {
	isInvalid?: boolean
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
	({ className, isInvalid, ...props }, ref) => {
		return (
			<div className={twMerge('w-full', className)}>
				<input
					type="file"
					className={twMerge(
						'block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4 file:py-3 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50',
						isInvalid &&
							'border-red-500 focus:border-red-500 focus:ring-red-500',
					)}
					ref={ref}
					{...props}
				/>
			</div>
		)
	},
)

FileInput.displayName = 'FileInput'
