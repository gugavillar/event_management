import { FcGoogle } from 'react-icons/fc'

import { Button, Header } from '@/components/Atoms'

export const LoginButton = () => {
	return (
		<aside className="flex h-screen w-full flex-col items-center justify-center space-y-6 p-6 md:p-8 lg:p-12">
			<Header>Acesse sua conta</Header>
			<Button
				leftIcon={<FcGoogle />}
				className="w-3/4 items-center justify-center bg-white py-4 text-lg font-medium text-slate-800/70 drop-shadow"
			>
				Acesse com o Google
			</Button>
		</aside>
	)
}
