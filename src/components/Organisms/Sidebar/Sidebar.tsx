import {
	ApplicationAvatar,
	PrincipalMenu,
	UserAvatar,
} from '@/components/Molecules'

export const Sidebar = () => {
	return (
		<aside className="flex flex-col bg-slate-800 px-4 py-6">
			<ApplicationAvatar />
			<PrincipalMenu />
			<UserAvatar />
		</aside>
	)
}
