'use client'

import { Button } from '@/components/Atoms'

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
	const isServerActionError = error.message.includes('Failed to find Server Action')

	return (
		<div className="flex size-full flex-col items-center justify-center gap-4 bg-gray-200 p-4">
			<div className="flex max-w-md flex-col items-center justify-center text-center">
				<h2 className="mb-2 text-3xl font-bold text-gray-900">
					{isServerActionError ? 'Atualização Disponível' : 'Algo deu errado!'}
				</h2>
				<p className="mb-6 text-gray-600">
					{isServerActionError
						? 'Uma nova versão do sistema foi implantada. Por favor, recarregue a página para continuar.'
						: 'Ocorreu um erro inesperado. Tente novamente ou contate o suporte.'}
				</p>
				<Button className="bg-teal-500 text-white hover:bg-teal-600" onClick={reset} type="button">
					Tentar novamente
				</Button>
			</div>
		</div>
	)
}

export default Error
