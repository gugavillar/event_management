import { act, renderHook } from '@testing-library/react'
import { signOut } from 'next-auth/react'

import { PRINCIPAL_LINKS } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import { updatePassword } from '../usecases'
import { useUpdatePassword } from './useUpdatePassword'

vi.mock('../usecases', () => ({
	updatePassword: vi.fn(),
}))

vi.mock('next-auth/react', () => ({
	signOut: vi.fn(),
}))

vi.useFakeTimers()

describe('useUpdatePassword', () => {
	it('should update password and call signOut', async () => {
		const mockUpdatePassword = vi.mocked(updatePassword)
		mockUpdatePassword.mockResolvedValue({
			success: true,
		})
		const wrapper = createWrapper()
		const { result } = renderHook(() => useUpdatePassword(), { wrapper })

		await act(async () => await result.current.update({ password: 'any-password' }))

		expect(updatePassword).toHaveBeenCalledWith(
			{
				password: 'any-password',
			},
			expect.any(Object)
		)
		expect(signOut).not.toHaveBeenCalled()

		await act(async () => {
			vi.advanceTimersByTime(2000)
		})

		expect(signOut).toHaveBeenCalledWith({
			callbackUrl: PRINCIPAL_LINKS.LOGIN,
			redirect: true,
		})

		vi.useRealTimers()
	})
})
