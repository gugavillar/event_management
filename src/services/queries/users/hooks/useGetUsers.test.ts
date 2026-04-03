import { faker } from '@faker-js/faker'
import { act, renderHook, waitFor } from '@testing-library/react'

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
		await act(async () => await result.current.setPage(2))
		await waitFor(() => {
			expect(result.current.page).toBe(2)
		})
	})

	it('should setSearch correctly', async () => {
		const mockGetUsers = vi.mocked(usecases.getUsers)
		mockGetUsers.mockResolvedValue({
			data: mockUsers,
		})
		const wrapper = createWrapper()
		const { result } = renderHook(() => useGetUsers(), { wrapper })
		await act(async () => await result.current.setSearch('any-name'))
		await waitFor(() => {
			expect(result.current.search).toBe('any-name')
		})
	})
})
