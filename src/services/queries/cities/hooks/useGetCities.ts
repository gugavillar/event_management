import { type AxiosResponse } from 'axios'

import { QUERY_KEYS } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'
import { ibgeUfAPI } from '@/services/ibgeService'

import { GetCitiesFromUfReturn } from '../cities.types'

export const useGetCities = ({ nome }: Pick<GetCitiesFromUfReturn, 'nome'>) => {
	const { data } = useQuery({
		queryKey: [QUERY_KEYS.CITIES, nome],
		queryFn: async ({ signal }) =>
			await ibgeUfAPI.get(
				`/localidades/estados/${nome}/municipios?orderBy=nome`,
				{ signal },
			),
		enabled: !!nome,
		select: ({ data }: AxiosResponse<Array<GetCitiesFromUfReturn>>) =>
			formatterFieldSelectValues(data, 'nome', 'nome'),
	})

	return { data }
}
