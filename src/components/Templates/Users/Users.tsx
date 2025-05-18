'use client'

import { Pagination } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { CreateUserButton, ListPage, PageContent } from '@/components/Organisms'
import { MODALS_IDS } from '@/constants'
import { useGetUsers } from '@/services/queries/users'

import { formatTableData, HEADER_LABELS } from './Users.utils'

export const Users = () => {
	const {
		data: users,
		isLoading,
		search,
		setSearch,
		page,
		setPage,
	} = useGetUsers()

	const formatData = formatTableData(users?.data)

	const hasMoreThanOnePage = !!users?.totalPages && users.totalPages > 1

	return (
		<PageContent
			title="Usuários"
			subheadingPage="Lista de usuários"
			isLoading={isLoading}
		>
			<ListPage
				search={search}
				setSearch={setSearch}
				placeholderField="Digite o nome do usuário"
				className="w-full lg:max-w-full"
				actionButton={
					<CreateUserButton drawerId={MODALS_IDS.USER_CREATE_MODAL} />
				}
			>
				<ListManager
					bodyData={formatData}
					headerLabels={HEADER_LABELS}
					isLoading={false}
				/>
				{hasMoreThanOnePage && (
					<Pagination
						currentPage={page}
						totalPages={users?.totalPages}
						setPage={setPage}
					/>
				)}
			</ListPage>
		</PageContent>
	)
}
