'use client'

import { User } from 'next-auth'
import { useState } from 'react'

import { Pagination } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import {
	ChangeRoleUserModal,
	CreateUserButton,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { useGetUsers } from '@/services/queries/users'
import { UserAPI } from '@/services/queries/users/users.type'

import { formatTableData, HEADER_LABELS } from './Users.utils'

type UsersProps = {
	userId: User['id']
}

export const Users = ({ userId }: UsersProps) => {
	const [selectedUser, setSelectedUser] = useState<UserAPI['id'] | null>(null)
	const {
		data: users,
		isLoading,
		search,
		setSearch,
		page,
		setPage,
	} = useGetUsers()

	const handleOpenChangeRoleModal = (id: UserAPI['id']) => {
		setSelectedUser(id)
		overlayOpen(MODALS_IDS.USER_CHANGE_ROLE_MODAL)
	}

	const formatData = formatTableData(
		users?.data,
		userId,
		handleOpenChangeRoleModal,
	)

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
			<ChangeRoleUserModal
				modalId={MODALS_IDS.USER_CHANGE_ROLE_MODAL}
				setSelectedUser={setSelectedUser}
				selectedUser={selectedUser}
			/>
		</PageContent>
	)
}
