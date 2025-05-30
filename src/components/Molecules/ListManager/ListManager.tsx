'use client'

import { Table, TableProps } from '@/components/Atoms'

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
			headerLabels={headerLabels}
			bodyData={bodyData}
			handleClickRow={handleClickRow}
			isLoading={isLoading}
		/>
	)
}
