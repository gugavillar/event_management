import { ibgeUfAPI } from '@/services/ibgeService'

export const getCity = async (nome: string, signal?: AbortSignal) => {
	const response = await ibgeUfAPI.get(`/localidades/estados/${nome}/municipios?orderBy=nome`, { signal })
	return response
}
