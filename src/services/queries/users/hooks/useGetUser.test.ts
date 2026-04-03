import { faker } from '@faker-js/faker'
import { renderHook, waitFor } from '@testing-library/react'
import type { UUID } from 'crypto'

import { createWrapper } from '@/utils/test-utils'

import * as usecases from '../usecases'
import { useGetUser } from './useGetUser'

vi.mock('../usecases', () => ({
	getUser: vi.fn(),
}))

const id = faker.string.uuid() as UUID

describe('useGetUser', () => {
	it('should call getUser with the correct id', async () => {
		const mockGetUser = vi.mocked(usecases.getUser)
		mockGetUser.mockResolvedValue({
			role: 'any-role',
		})
		const wrapper = createWrapper()
		renderHook(() => useGetUser(id), { wrapper })
		expect(usecases.getUser).toHaveBeenCalledWith(id)
	})

	it('should not call getUser without id', async () => {
		const mockGetUser = vi.mocked(usecases.getUser)
		mockGetUser.mockResolvedValue({
			role: 'any-role',
		})
		const wrapper = createWrapper()
		renderHook(() => useGetUser(null), { wrapper })
		expect(usecases.getUser).not.toHaveBeenCalled()
	})

	it('should return correctly user', async () => {
		const mockResponse = { role: { dashboard: true } }
		vi.spyOn(usecases, 'getUser').mockResolvedValue(mockResponse)
		const wrapper = createWrapper()
		const { result } = renderHook(() => useGetUser(id), { wrapper })
		await waitFor(() => {
			expect(result.current.data).toEqual(mockResponse)
		})
	})
})
