import { ComponentProps, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { PaymentTypeAPI, PaymentType } from '@/constants'

type PaymentTagProps = ComponentProps<'mark'> & {
	status: (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI]
}

const STATUS_COLORS = {
	[PaymentTypeAPI.CARD]: 'bg-blue-300 bg-opacity-30',
	[PaymentTypeAPI.CASH]: 'bg-yellow-400 bg-opacity-30',
	[PaymentTypeAPI.PIX]: 'bg-green-500 bg-opacity-30',
	[PaymentTypeAPI.DONATION]: 'bg-purple-400 bg-opacity-30',
	[PaymentTypeAPI.OPEN]: 'bg-gray-400 bg-opacity-30',
}

export const PaymentTag = memo(
	({ status, className, ...props }: PaymentTagProps) => {
		return (
			<mark
				className={twMerge(
					'flex w-20 items-center justify-center rounded-3xl px-4 py-1 text-slate-800',
					className,
					STATUS_COLORS[status],
				)}
				{...props}
			>
				{PaymentType[status].label}
			</mark>
		)
	},
)

PaymentTag.displayName = 'PaymentTag'
