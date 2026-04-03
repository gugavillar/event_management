import type { UseQueryResult } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { QUERY_KEYS } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useQuery } from '@/providers/QueryProvider'

import type { GetCitiesFromUfReturn } from '../cities.types'
import { getCity } from '../usecases'

export const useGetCities = ({ nome }: Pick<GetCitiesFromUfReturn, 'nome'>) => {
	const { data }: UseQueryResult<Array<{ label: string; value: string }>> = useQuery({
		enabled: !!nome,
		queryFn: ({ signal }) => getCity(nome, signal),
		queryKey: [QUERY_KEYS.CITIES, nome],
		select: ({ data }: AxiosResponse<Array<GetCitiesFromUfReturn>>) => formatterFieldSelectValues(data, 'nome', 'nome'),
	})

	return { data }
}
