'use client'

import { Table, type TableProps } from '@/components/Atoms'

type ParticipantManagerProps = {
	bodyData: TableProps['bodyData']
	isLoading: TableProps['isLoading']
	headerLabels: TableProps['headerLabels']
	handleClickRow?: TableProps['handleClickRow']
}

export const ListManager = ({
	bodyData,
	headerLabels,
	handleClickRow,
	isLoading,
}: ParticipantManagerProps) => {
	return (
		<Table
			bodyData={bodyData}
			handleClickRow={handleClickRow}
			headerLabels={headerLabels}
			isLoading={isLoading}
		/>
	)
}
