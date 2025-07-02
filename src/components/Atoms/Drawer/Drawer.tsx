'use client'
import { CircleX } from 'lucide-react'
import { ComponentProps, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

import { Header } from '../Header'

type DrawerProps = ComponentProps<'div'> & {
	children: ReactNode
	headingTitle: string
	drawerId: string
	handleClose?: () => void
}

export const Drawer = ({
	children,
	drawerId,
	headingTitle,
	handleClose,
	className,
}: DrawerProps) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
		return () => {
			setIsMounted(false)
		}
	}, [])

	if (!isMounted) return null

	return createPortal(
		<div
			id={drawerId}
			className={twMerge(
				'hs-overlay fixed end-0 top-0 z-[80] hidden size-full max-w-lg translate-x-full border-s bg-white transition-all duration-300 hs-overlay-open:translate-x-0',
				className,
			)}
			style={{ marginTop: 0 }}
			data-testid="drawer"
		>
			<div className="flex items-center justify-between border-b px-4 py-3">
				<Header as="h3">{headingTitle}</Header>
				<button
					type="button"
					className="flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-slate-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
					data-hs-overlay={`#${drawerId}`}
					onClick={handleClose}
				>
					<span className="sr-only">Close modal</span>
					<CircleX size={20} />
				</button>
			</div>
			{children}
		</div>,
		document.body,
	)
}
