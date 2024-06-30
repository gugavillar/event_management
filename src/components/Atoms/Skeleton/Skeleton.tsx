import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type SkeletonProps = ComponentProps<'div'>

export const Skeleton = ({ className, children, ...props }: SkeletonProps) => {
	return (
		<div className="flex animate-pulse">
			<div className={twMerge('size-12 bg-gray-200', className)} {...props} />
		</div>
	)
}
