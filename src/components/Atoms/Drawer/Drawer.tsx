import { ReactNode } from 'react'
import { MdOutlineClose } from 'react-icons/md'

import { Header } from '../Header'

type DrawerProps = {
	children: ReactNode
	headingTitle: string
	drawerId: string
}

export const Drawer = ({ children, drawerId, headingTitle }: DrawerProps) => {
	return (
		<div
			id={drawerId}
			className="hs-overlay fixed end-0 top-0 z-[80] hidden size-full max-w-lg translate-x-full border-s bg-white transition-all duration-300 hs-overlay-open:translate-x-0"
			style={{ marginTop: 0 }}
			data-testid="drawer"
		>
			<div className="flex items-center justify-between border-b px-4 py-3">
				<Header as="h3">{headingTitle}</Header>
				<button
					type="button"
					className="flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-slate-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
					data-hs-overlay={`#${drawerId}`}
				>
					<span className="sr-only">Close modal</span>
					<MdOutlineClose />
				</button>
			</div>
			{children}
		</div>
	)
}
