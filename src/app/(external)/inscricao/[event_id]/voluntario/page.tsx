import Image from 'next/image'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { ExternalVolunteerForm } from '@/components/Templates'
import { eventPermitCreateRegistration } from '@/constants'
import { getEventById } from '@/server'

export default async function RegistrationPage({
	params,
}: {
	params: { event_id: string }
}) {
	const isValidEventId = z
		.object({
			event_id: z.string().uuid(),
		})
		.safeParse({ event_id: params.event_id })

	if (!isValidEventId.success) {
		notFound()
	}

	const event = await getEventById(params.event_id)

	const isRegistrationPermitted = eventPermitCreateRegistration(event)

	if (!isRegistrationPermitted) {
		notFound()
	}

	return (
		<div className="grid h-dvh w-full lg:grid-cols-2">
			<div className="flex max-md:h-fit">
				<Image
					src="/background_hb.png"
					width={0}
					height={0}
					sizes="100vw"
					className="h-3/5 w-full object-cover lg:size-full"
					alt="Background image"
					priority
				/>
			</div>
			<div className="size-full overflow-y-auto">
				<div className="flex min-h-full flex-col items-center justify-center space-y-8 p-8">
					<header className="space-y-2 text-center">
						<h1 className="text-5xl">{event?.name}</h1>
						<h2 className="text-3xl">Voluntário</h2>
					</header>
					<ExternalVolunteerForm
						registrationValue={Number(event?.volunteerPrice)}
						eventId={event?.id}
					/>
				</div>
			</div>
		</div>
	)
}
