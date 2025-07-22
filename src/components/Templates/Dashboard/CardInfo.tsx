export const CardInfo = () => {
	return (
		<div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-md">
			<div className="p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">
					Nenhum evento selecionado
				</h3>
				<p className="mt-2 text-gray-500">
					Para exibir as informações do dashboard, você precisa primeiro
					escolher um evento.
				</p>
				<p className="mt-2 text-gray-500">
					Assim, os dados específicos de participantes, voluntários, pagamentos
					e demais indicadores relacionados serão exibidos.
				</p>
				<p className="mt-2 text-gray-500">Escolha um evento para continuar.</p>
			</div>
		</div>
	)
}
