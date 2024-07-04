import { faker } from '@faker-js/faker'

import { Avatar, Button, Text } from '@/components/Atoms'

// TODO: remover quando tiver a integração
const MOCKED_USER = {
	name: `${faker.person.firstName()} ${faker.person.lastName()}`,
	role: faker.person.jobArea(),
}

export const UserAvatar = () => {
	return (
		<section className="mt-auto flex flex-col space-y-6">
			<div className="flex items-center gap-x-4">
				<Avatar>{MOCKED_USER.name}</Avatar>
				<div>
					<Text className="font-bold text-gray-100">{MOCKED_USER.name}</Text>
					<Text className="text-sm text-gray-100/40">{MOCKED_USER.role}</Text>
				</div>
			</div>
			<Button className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800">
				Sair
			</Button>
		</section>
	)
}
