'use client'

import dynamic from 'next/dynamic'
import { User } from 'next-auth'
import { useCallback, useState } from 'react'

import { Pagination } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { CreateUserButton, ListPage, PageContent } from '@/components/Organisms'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { useGetUsers } from '@/services/queries/users'
import { UserAPI } from '@/services/queries/users/users.type'

import { formatTableData, HEADER_LABELS } from './Users.utils'

type UsersProps = {
	userId: User['id']
}

const BlockUserModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.BlockUserModal),
)

const ChangeRoleUserModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.ChangeRoleUserModal),
)

const UserResetPasswordModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.UserResetPasswordModal),
)

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

	const handleOpenChangeRoleModal = useCallback((id: UserAPI['id']) => {
		setSelectedUser(id)
		overlayOpen(MODALS_IDS.USER_CHANGE_ROLE_MODAL)
	}, [])

	const handleOpenResetPasswordModal = useCallback((id: UserAPI['id']) => {
		setSelectedUser(id)
		overlayOpen(MODALS_IDS.USER_RESET_PASSWORD_MODAL)
	}, [])

	const handleOpenBlockUserModal = useCallback((id: UserAPI['id']) => {
		setSelectedUser(id)
		overlayOpen(MODALS_IDS.USER_BLOCK_MODAL)
	}, [])

	const formatData = formatTableData(
		users?.data,
		userId,
		handleOpenChangeRoleModal,
		handleOpenResetPasswordModal,
		handleOpenBlockUserModal,
	)

	const hasMoreThanOnePage = !!users?.totalPages && users.totalPages > 1

	return (
		<PageContent title="Usuários" subheadingPage="Lista de usuários">
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
					isLoading={isLoading}
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
			<UserResetPasswordModal
				modalId={MODALS_IDS.USER_RESET_PASSWORD_MODAL}
				selectedUser={selectedUser}
				setSelectedUser={setSelectedUser}
			/>
			<BlockUserModal
				modalId={MODALS_IDS.USER_BLOCK_MODAL}
				selectedUser={selectedUser}
				setSelectedUser={setSelectedUser}
			/>
		</PageContent>
	)
}
