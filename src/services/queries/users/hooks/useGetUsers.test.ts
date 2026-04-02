import { faker } from '@faker-js/faker'
import { renderHook, waitFor } from '@testing-library/react'

import { createWrapper } from '@/utils/test-utils'

import * as usecases from '../usecases'
import { useGetUsers } from './useGetUsers'

vi.mock('../usecases', () => ({
	getUsers: vi.fn(),
}))

const mockUsers = [{ email: faker.internet.email(), id: faker.string.uuid(), name: faker.person.fullName() }]

describe('useGetUsers', () => {
	it('should call getUsers correctly', () => {
		const mockGetUsers = vi.mocked(usecases.getUsers)
		mockGetUsers.mockResolvedValue({
			data: mockUsers,
		})
		const wrapper = createWrapper()
		renderHook(() => useGetUsers(), { wrapper })
		expect(usecases.getUsers).toHaveBeenCalledWith({
			page: null,
			searchUser: null,
		})
	})

	it('should setPage correctly', async () => {
		const mockGetUsers = vi.mocked(usecases.getUsers)
		mockGetUsers.mockResolvedValue({
			data: mockUsers,
		})
		const wrapper = createWrapper()
		const { result } = renderHook(() => useGetUsers(), { wrapper })
		result.current.setPage(2)
		await waitFor(() => {
			expect(result.current.setPage).toHaveBeenCalledWith(2)
		})
	})

	it('should setSearch correctly', async () => {
		const mockGetUsers = vi.mocked(usecases.getUsers)
		mockGetUsers.mockResolvedValue({
			data: mockUsers,
		})
		const wrapper = createWrapper()
		const { result } = renderHook(() => useGetUsers(), { wrapper })
		result.current.setSearch('any-name')
		await waitFor(() => {
			expect(result.current.setSearch).toHaveBeenCalledWith('any-name')
		})
	})
})
