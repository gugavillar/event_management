import { faker } from '@faker-js/faker'
import { QueryClient } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'

import { QUERY_KEYS } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import { createUser } from '../usecases'
import { useCreateUser } from './useCreateUser'

vi.mock('../usecases', () => ({
	createUser: vi.fn(),
}))

const mockData = {
	email: faker.internet.email(),
	name: faker.person.fullName(),
}

describe('useCreateUser', () => {
	it('should create and invalidate users query', async () => {
		const mockCreateUser = vi.mocked(createUser)
		mockCreateUser.mockResolvedValue({ ...mockData })
		const queryClient = new QueryClient()
		const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
		const wrapper = createWrapper(queryClient)

		const { result } = renderHook(() => useCreateUser(), { wrapper })

		await act(async () => await result.current.create({ ...mockData }))

		expect(createUser).toHaveBeenCalledWith(
			{
				...mockData,
			},
			expect.any(Object)
		)
		await waitFor(() => {
			expect(invalidateQueries).toHaveBeenCalledWith({
				queryKey: [QUERY_KEYS.USERS],
			})
		})
	})
})
