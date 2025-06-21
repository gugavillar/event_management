import axios from 'axios'

export const ibgeUfAPI = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_IBGE_UF,
})

ibgeUfAPI.interceptors.response.use(
	(response) => response,
	(error) => error?.message,
)
