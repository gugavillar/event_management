import { LoginSvg } from '@/components/Atoms'
import { LoginButton } from '@/components/Organisms'

export const Login = () => {
	return (
		<section className="flex size-full items-center justify-center gap-x-8 bg-stone-50 md:grid md:grid-cols-1 lg:grid-cols-[minmax(0,60rem)_30rem]">
			<LoginSvg className="hidden size-full lg:block" />
			<LoginButton />
		</section>
	)
}
