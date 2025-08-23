import { Table } from '@/components/Atoms'

import { HEADER_LABELS } from './TransactionsTable.utils'

export const TransactionsTable = () => {
	return <Table isLoading={false} headerLabels={HEADER_LABELS} bodyData={[]} />
}
