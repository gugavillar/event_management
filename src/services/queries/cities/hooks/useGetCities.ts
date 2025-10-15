import { QUERY_KEYS } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'
import { ibgeUfAPI } from '@/services/ibgeService'
import type { AxiosResponse } from 'axios'
import type { GetCitiesFromUfReturn } from '../cities.types'

export const useGetCities = ({ nome }: Pick<GetCitiesFromUfReturn, 'nome'>) => {
	const { data } = useQuery({
		enabled: !!nome,
		queryFn: async ({ signal }) =>
			await ibgeUfAPI.get(
				`/localidades/estados/${nome}/municipios?orderBy=nome`,
				{ signal }
			),
		queryKey: [QUERY_KEYS.CITIES, nome],
		select: ({ data }: AxiosResponse<Array<GetCitiesFromUfReturn>>) =>
			formatterFieldSelectValues(data, 'nome', 'nome'),
	})

	return { data }
}
