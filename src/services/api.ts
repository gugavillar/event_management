import { isServer } from '@tanstack/react-query'

import { PRINCIPAL_LINKS } from '@/constants'
import axios from 'axios'
import { signOut } from 'next-auth/react'
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
	async (error) => {
		if (!isServer && error?.response?.status === 401) {
			await signOut({ callbackUrl: PRINCIPAL_LINKS.LOGIN })
		}

		return Promise.reject(error)
	}
)
