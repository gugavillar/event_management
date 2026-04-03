import { mockCityAxios } from '@tests'

import { getCity } from './getCity'

const mockCities = [
	{
		id: 5300108,
		microrregiao: {
			id: 53001,
			mesorregiao: {
				id: 5301,
				nome: 'Distrito Federal',
				UF: {
					id: 53,
					nome: 'Distrito Federal',
					regiao: {
						id: 5,
						nome: 'Centro-Oeste',
						sigla: 'CO',
					},
					sigla: 'DF',
				},
			},
			nome: 'Brasília',
		},
		nome: 'Brasília',
		'regiao-imediata': {
			id: 530001,
			nome: 'Distrito Federal',
			'regiao-intermediaria': {
				id: 5301,
				nome: 'Distrito Federal',
				UF: {
					id: 53,
					nome: 'Distrito Federal',
					regiao: {
						id: 5,
						nome: 'Centro-Oeste',
						sigla: 'CO',
					},
					sigla: 'DF',
				},
			},
		},
	},
]

describe('getCity', () => {
	it('should return cities correctly', async () => {
		mockCityAxios.onGet(`/localidades/estados/DF/municipios?orderBy=nome`).reply(200, mockCities)
		const { data } = await getCity('DF')
		expect(data).toStrictEqual(mockCities)
	})
})
