'use client'

import {
	CreateVolunteerFunctionButton,
	ListPage,
	PageContent,
} from '@/components/Organisms'

export const VolunteersFunctions = () => {
	return (
		<PageContent
			pageTitle="Funções voluntários"
			subheadingPage="Listagem das funções de voluntários"
			isLoading={false}
		>
			<ListPage
				placeholderField="Encontrar uma função"
				className="lg:max-w-full"
				actionButton={<CreateVolunteerFunctionButton />}
			></ListPage>
		</PageContent>
	)
}
