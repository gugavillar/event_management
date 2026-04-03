import '@testing-library/jest-dom'
import AxiosMockAdapter from 'axios-mock-adapter'
import { beforeAll } from 'vitest'

import { api } from '@/services/api'
import { ibgeUfAPI } from '@/services/ibgeService'

let mockAxios: AxiosMockAdapter
let mockCityAxios: AxiosMockAdapter

beforeAll(() => {
	mockAxios = new AxiosMockAdapter(api)
	mockCityAxios = new AxiosMockAdapter(ibgeUfAPI)
})

beforeEach(() => {
	vi.clearAllMocks()
	mockAxios.reset()
	mockCityAxios.reset()
})

export { mockAxios, mockCityAxios }
