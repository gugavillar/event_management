import { IoMdSearch } from 'react-icons/io'

import { Field, Table, TableProps } from '@/components/Atoms'

type ListPageProps = {
	bodyData: TableProps['bodyData']
	headerLabels: TableProps['headerLabels']
	placeholderField: string
}
export const ListPage = ({
	bodyData,
	headerLabels,
	placeholderField,
}: ListPageProps) => {
	return (
		<>
			<Field
				placeholder={placeholderField}
				rightIcon={<IoMdSearch size={24} />}
				className="max-w-sm ps-11"
			/>
			<Table headerLabels={headerLabels} bodyData={bodyData} />
		</>
	)
}
