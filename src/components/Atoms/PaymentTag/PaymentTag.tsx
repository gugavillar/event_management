import { ComponentProps, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { PaymentTypeAPI, PaymentType } from '@/constants'

type PaymentTagProps = ComponentProps<'mark'> & {
	status: (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI]
	isNotTotal: boolean
}

const STATUS_COLORS = {
	[PaymentTypeAPI.CARD]: 'bg-blue-300 bg-opacity-30',
	[PaymentTypeAPI.CASH]: 'bg-yellow-400 bg-opacity-30',
	[PaymentTypeAPI.PIX]: 'bg-green-500 bg-opacity-30',
	[PaymentTypeAPI.DONATION]: 'bg-purple-400 bg-opacity-30',
	[PaymentTypeAPI.DONATION_ROMERO]: 'bg-purple-600 bg-opacity-30',
	[PaymentTypeAPI.OPEN]: 'bg-gray-400 bg-opacity-30',
}

export const PaymentTag = memo(
	({ status, className, isNotTotal, ...props }: PaymentTagProps) => {
		return (
			<mark
				className={twMerge(
					'flex w-fit min-w-36 items-center justify-center gap-x-1.5 rounded-3xl px-4 py-1 text-slate-800',
					className,
					STATUS_COLORS[status],
				)}
				{...props}
			>
				{isNotTotal && (
					<span className="inline-block size-2 rounded-full bg-amber-500"></span>
				)}
				{PaymentType[status].label}
			</mark>
		)
	},
)

PaymentTag.displayName = 'PaymentTag'
