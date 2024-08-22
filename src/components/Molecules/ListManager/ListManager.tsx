'use client'
import { ReactNode } from 'react'

import {
	Table,
	Drawer,
	TableProps,
	DrawerBody,
	DrawerFooter,
} from '@/components/Atoms'

type ParticipantManagerProps = {
	bodyData: TableProps['bodyData']
	isLoading: TableProps['isLoading']
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
	isLoading,
}: ParticipantManagerProps) => {
	return (
		<>
			<Table
				headerLabels={headerLabels}
				bodyData={bodyData}
				handleClickRow={handleClickRow}
				isLoading={isLoading}
			/>
			{drawerId ? (
				<Drawer drawerId={drawerId} headingTitle={drawerTitle}>
					<DrawerBody>{drawerContent}</DrawerBody>
					<DrawerFooter>{drawerFooter}</DrawerFooter>
				</Drawer>
			) : null}
		</>
	)
}
