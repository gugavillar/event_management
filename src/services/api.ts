import axios from 'axios'
import { signOut } from 'next-auth/react'

import { IS_SERVER, PRINCIPAL_LINKS } from '@/constants'

import { BASE_URL } from './endpoints'

export const api = axios.create({
	baseURL: IS_SERVER ? BASE_URL : '/api',
})

api.interceptors.request.use(async (config) => {
	if (IS_SERVER) {
		const { cookies } = await import('next/headers')
		const headersCookies = (await cookies()).toString()
		config.headers.Cookie = headersCookies
	}
	return config
})

api.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		if (!IS_SERVER && error?.response?.status === 401) {
			await signOut({ callbackUrl: PRINCIPAL_LINKS.LOGIN })
		}

		return Promise.reject(error)
	}
)
