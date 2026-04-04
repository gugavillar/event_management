import { ENDPOINTS_IBGE } from '@/services/endpoints'
import { ibgeUfAPI } from '@/services/ibgeService'

export const getCity = async (state: string, signal?: AbortSignal) => {
	const response = await ibgeUfAPI.get(ENDPOINTS_IBGE.GET_CITIES_BY_STATE(state), { signal })
	return response
}
