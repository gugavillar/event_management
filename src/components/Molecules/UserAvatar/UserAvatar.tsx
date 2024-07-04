import { faker } from '@faker-js/faker'

import { Avatar, Text } from '@/components/Atoms'

// TODO: remover quando tiver a integração
const MOCKED_USER = {
	name: `${faker.person.firstName()} ${faker.person.lastName()}`,
	role: faker.person.jobArea(),
}

export const UserAvatar = () => {
	return (
		<section className="mt-auto flex items-center gap-x-4">
			<Avatar>{MOCKED_USER.name}</Avatar>
			<div>
				<Text className="font-bold text-gray-50">{MOCKED_USER.name}</Text>
				<Text className="text-sm text-gray-100/30">{MOCKED_USER.role}</Text>
			</div>
		</section>
	)
}
