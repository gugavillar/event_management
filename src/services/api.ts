import axios from 'axios'

import { BASE_URL } from './endpoints'

export const api = axios.create({
	baseURL: BASE_URL,
})
