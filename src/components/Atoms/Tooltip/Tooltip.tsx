import * as TooltipRadix from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

export type TooltipProps = {
	trigger: ReactNode
	children: ReactNode
	sideOffset?: number
	side?: 'top' | 'right' | 'bottom' | 'left'
}

export const Tooltip = ({ trigger, children, sideOffset = 20, side = 'right' }: TooltipProps) => {
	return (
		<TooltipRadix.Provider delayDuration={100}>
			<TooltipRadix.Root>
				<TooltipRadix.Trigger asChild>{trigger}</TooltipRadix.Trigger>
				<TooltipRadix.Portal>
					<TooltipRadix.Content
						className="bg-gray-900 text-white px-2 py-1 text-sm shadow-lg rounded-md"
						side={side}
						sideOffset={sideOffset}
					>
						{children}
					</TooltipRadix.Content>
				</TooltipRadix.Portal>
			</TooltipRadix.Root>
		</TooltipRadix.Provider>
	)
}
