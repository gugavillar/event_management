import '@testing-library/jest-dom'
import AxiosMockAdapter from 'axios-mock-adapter'
import { beforeAll } from 'vitest'

import { api } from '@/services/api'

let mockAxios: AxiosMockAdapter

beforeAll(() => {
	mockAxios = new AxiosMockAdapter(api)
})

afterEach(() => {
	mockAxios.reset()
})

export { mockAxios }
