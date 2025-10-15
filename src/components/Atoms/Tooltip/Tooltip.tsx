'use client'
import { isServer } from '@tanstack/react-query'
import { type ComponentProps, memo, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

type TooltipProps = ComponentProps<'span'>

export const Tooltip = memo(
	({ children, className, ...props }: TooltipProps) => {
		useEffect(() => {
			const load = async () => {
				if (isServer) return

				const { HSTooltip } = await import('preline/preline')
				HSTooltip.autoInit()
			}
			load()
		}, [])

		return (
			<span
				className={twMerge(
					'hs-tooltip-content hs-tooltip-shown:visible hs-tooltip-shown:opacity-100 invisible absolute z-10 inline-block rounded-md bg-gray-900 px-2 py-1 text-sm font-medium text-white opacity-0 shadow-md transition-opacity',
					className
				)}
				role="tooltip"
				{...props}
			>
				{children}
			</span>
		)
	}
)

Tooltip.displayName = 'Tooltip'
