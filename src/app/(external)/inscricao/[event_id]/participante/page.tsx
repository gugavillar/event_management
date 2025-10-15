import Image from 'next/image'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { ClosedInscriptions } from '@/components/Templates'
import { ExternalParticipantForm } from '@/components/Templates/ExternalParticipantForm'
import { eventPermitCreateRegistration, image, MEMBERS } from '@/constants'
import { getEvent } from '@/services/queries/events'
import type { EventsAPI } from '@/services/queries/events/event.type'

type Params = {
	params: Promise<{
		event_id?: EventsAPI['id']
	}>
}

export default async function RegistrationPage({ params }: Params) {
	const pageParams = await params.then((res) => ({
		event_id: res.event_id,
	}))
	const isValidEventId = z
		.object({
			event_id: z.uuid(),
		})
		.safeParse({ event_id: pageParams.event_id })

	if (!isValidEventId.success || !pageParams.event_id) {
		notFound()
	}

	const event: EventsAPI = await getEvent(pageParams.event_id)

	const isRegistrationPermitted = eventPermitCreateRegistration(event, MEMBERS.PARTICIPANT)

	if (!isRegistrationPermitted) {
		return <ClosedInscriptions />
	}

	const backgroundImage = image(event?.name)
	const isNotHappening = !event?.name.toLowerCase().includes('happening')

	return (
		<div className="grid h-dvh w-full lg:grid-cols-2">
			<div className="relative size-full h-[50dvh] lg:h-dvh">
				<Image
					alt="Background image"
					blurDataURL="/placeholder.png"
					className="object-cover"
					fill
					placeholder="blur"
					sizes="100vw"
					src={backgroundImage}
				/>
			</div>
			<div className="size-full h-[50dvh] overflow-y-auto lg:h-full">
				<div className="flex min-h-full flex-col items-center justify-center space-y-8 p-8">
					<header className="space-y-2 text-center">
						<h1 className="text-4xl">{event?.name}</h1>
						<h2 className="text-3xl">Participante</h2>
					</header>
					<ExternalParticipantForm
						eventId={event?.id}
						isNotHappening={isNotHappening}
						maxAge={event?.maxAge}
						minAge={event?.minAge}
						registrationValue={Number(event.participantPrice)}
					/>
				</div>
			</div>
		</div>
	)
}
