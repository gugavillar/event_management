import { LoginSvg } from '@/components/Atoms'
import { LoginButton } from '@/components/Organisms'

export const Login = () => {
	return (
		<section className="flex h-full w-full items-center justify-center gap-x-8 bg-stone-50 md:grid md:grid-cols-1 lg:grid-cols-appLg">
			<LoginSvg className="hidden h-full w-full lg:block" />
			<LoginButton />
		</section>
	)
}
