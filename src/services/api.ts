import { isServer } from '@tanstack/react-query'
import axios from 'axios'

import { BASE_URL } from './endpoints'

export const api = axios.create({
	baseURL: BASE_URL,
})

api.interceptors.request.use(async (config) => {
	if (isServer) {
		const { cookies } = await import('next/headers')
		const headersCookies = (await cookies()).toString()
		config.headers.Cookie = headersCookies
	}
	return config
})

api.interceptors.response.use(
	(response) => response.data,
	(error) => Promise.reject(error.response || error),
)
