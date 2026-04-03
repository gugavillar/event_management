import { renderHook, waitFor } from '@testing-library/react'
import type { AxiosResponse } from 'axios'

import { createWrapper } from '@/utils/test-utils'

import { getCity } from '../usecases'
import { useGetCities } from './useGetCities'

vi.mock('../usecases', () => ({
	getCity: vi.fn(),
}))

const mockedCities = [{ estado: 'any-state', id: '1', nome: 'any-city' }]

describe('useGetCities', () => {
	it('should not call getCity when nome is empty', () => {
		const mockedGetCity = vi.mocked(getCity)
		mockedGetCity.mockResolvedValue({
			data: mockedCities,
			status: 200,
		} as AxiosResponse)
		const wrapper = createWrapper()
		renderHook(() => useGetCities({ nome: '' }), { wrapper })
		expect(getCity).not.toHaveBeenCalled()
	})

	it('should return correctly cities', async () => {
		const mockedGetCity = vi.mocked(getCity)
		mockedGetCity.mockResolvedValue({
			data: mockedCities,
			status: 200,
		} as AxiosResponse)
		const wrapper = createWrapper()
		const { result } = renderHook(() => useGetCities({ nome: 'any-name' }), { wrapper })
		expect(getCity).toHaveBeenCalledWith('any-name', expect.any(Object))
		await waitFor(() => {
			expect(result.current).toEqual({ data: [{ label: 'any-city', value: 'any-city' }] })
		})
	})
})
