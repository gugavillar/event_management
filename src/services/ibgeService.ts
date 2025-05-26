import axios from 'axios'

export const ibgeUfAPI = axios.create({
	baseURL: process.env.API_IBGE_UF,
})

ibgeUfAPI.interceptors.response.use(
	(response) => response,
	(error) => error?.message,
)
