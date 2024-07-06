'use client'
import { ReactNode } from 'react'

import { Table, Drawer, TableProps } from '@/components/Atoms'

type ParticipantManagerProps = {
	bodyData: TableProps['bodyData']
	headerLabels: TableProps['headerLabels']
	handleClickRow?: TableProps['handleClickRow']
} & (
	| {
			drawerId: string
			drawerTitle: string
			drawerContent: ReactNode
			drawerFooter: ReactNode
	  }
	| {
			drawerId?: never
			drawerTitle?: never
			drawerContent?: never
			drawerFooter?: never
	  }
)

export const ListManager = ({
	bodyData,
	drawerId,
	headerLabels,
	handleClickRow,
	drawerContent,
	drawerTitle,
	drawerFooter,
}: ParticipantManagerProps) => {
	return (
		<>
			<Table
				headerLabels={headerLabels}
				bodyData={bodyData}
				handleClickRow={handleClickRow}
			/>
			{drawerId ? (
				<Drawer drawerId={drawerId} headingTitle={drawerTitle}>
					<section className="max-h-[calc(88dvh-4rem)] space-y-6 overflow-y-auto p-6">
						{drawerContent}
					</section>
					<footer className="absolute bottom-0 flex min-h-16 w-full flex-col items-center justify-between gap-y-2 px-6 pb-6 pt-3 md:flex-row md:gap-x-6">
						{drawerFooter}
					</footer>
				</Drawer>
			) : null}
		</>
	)
}
