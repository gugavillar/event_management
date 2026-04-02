import { faker } from '@faker-js/faker'
import { QueryClient } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'
import type { UUID } from 'crypto'

import { createWrapper } from '@/utils/test-utils'

import { updateUserRole } from '../usecases'
import { useUpdateUserRole } from './useUpdateUserRole'

vi.mock('../usecases', () => ({
	updateUserRole: vi.fn(),
}))

const id = faker.string.uuid() as UUID
const permissions = {
	dashboard: true,
	donations: false,
	events: false,
	groups: false,
	meetings: false,
	participants: {
		interest: false,
		list: false,
		payment: false,
		picture: false,
	},
	rooms: false,
	transactions: false,
	users: false,
	volunteers: {
		functions: false,
		list: false,
		payment: false,
	},
}

describe('useUpdateUserRole', () => {
	it('should update user role and call invalidateQueries', async () => {
		const mockUpdateUserRole = vi.mocked(updateUserRole)
		mockUpdateUserRole.mockResolvedValue({
			success: true,
		})
		const queryClient = new QueryClient()
		const wrapper = createWrapper(queryClient)
		const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
		const { result } = renderHook(() => useUpdateUserRole(), { wrapper })

		await act(
			async () =>
				await result.current.update({
					permissions,
					userId: id,
				})
		)
		expect(updateUserRole).toHaveBeenCalledWith(
			{
				permissions,
				userId: id,
			},
			expect.any(Object)
		)
		expect(invalidateQueries).toHaveBeenCalledTimes(2)
	})
})
