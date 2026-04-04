import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type InfoCardProps = ComponentProps<'div'> & {
	title: string
	description: string
}

export const InfoCard = ({ title, description, className, ...props }: InfoCardProps) => {
	return (
		<div
			className={twMerge(
				'flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5',
				className
			)}
			{...props}
		>
			<h3 className="font-bold text-gray-800 text-lg">{title}</h3>
			<p className="mt-2 text-gray-500">{description}</p>
		</div>
	)
}
