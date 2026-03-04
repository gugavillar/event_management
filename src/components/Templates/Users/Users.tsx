'use client'

import dynamic from 'next/dynamic'
import type { User } from 'next-auth'
import { useCallback, useState } from 'react'

import { Pagination } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { CreateUserButton, ListPage, PageContent } from '@/components/Organisms'
import { USERS_MODAL_TYPE } from '@/constants'
import { useGetUsers } from '@/services/queries/users'
import type { UserAPI } from '@/services/queries/users/users.type'

import { formatTableData, HEADER_LABELS } from './Users.utils'

type UsersProps = {
	userId: User['id']
}

export type SelectedUser = {
	id: UserAPI['id']
	modal: USERS_MODAL_TYPE
}

const BlockUserModal = dynamic(() => import('@/components/Organisms').then((mod) => mod.BlockUserModal))

const ChangeRoleUserModal = dynamic(() => import('@/components/Organisms').then((mod) => mod.ChangeRoleUserModal))

const UserResetPasswordModal = dynamic(() => import('@/components/Organisms').then((mod) => mod.UserResetPasswordModal))

export const Users = ({ userId }: UsersProps) => {
	const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null)
	const { data: users, isLoading, search, setSearch, page, setPage } = useGetUsers()

	const handleOpenChangeRoleModal = useCallback((id: UserAPI['id']) => {
		setSelectedUser({ id, modal: USERS_MODAL_TYPE.CHANGE_ROLE })
	}, [])

	const handleOpenResetPasswordModal = useCallback((id: UserAPI['id']) => {
		setSelectedUser({ id, modal: USERS_MODAL_TYPE.RESET_PASSWORD })
	}, [])

	const handleOpenBlockUserModal = useCallback((id: UserAPI['id']) => {
		setSelectedUser({ id, modal: USERS_MODAL_TYPE.BLOCK })
	}, [])

	const formatData = formatTableData(
		users?.data,
		userId,
		handleOpenChangeRoleModal,
		handleOpenResetPasswordModal,
		handleOpenBlockUserModal
	)

	const hasMoreThanOnePage = !!users?.totalPages && users.totalPages > 1

	return (
		<PageContent subheadingPage="Lista de usuários" title="Usuários">
			<ListPage
				actionButton={<CreateUserButton />}
				className="w-full lg:max-w-full"
				placeholderField="Digite o nome do usuário"
				search={search}
				setSearch={setSearch}
			>
				<ListManager bodyData={formatData} headerLabels={HEADER_LABELS} isLoading={isLoading} />
				{hasMoreThanOnePage && <Pagination currentPage={page} setPage={setPage} totalPages={users?.totalPages} />}
			</ListPage>
			<ChangeRoleUserModal selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
			<UserResetPasswordModal selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
			<BlockUserModal selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
		</PageContent>
	)
}
