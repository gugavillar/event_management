import { Volunteers } from '@/components/Templates'
import { FAKE_VOLUNTEERS } from '@/components/Templates/Volunteers/Volunteers.mocks'

export default function VolunteersPage() {
	const volunteers = FAKE_VOLUNTEERS()
	return <Volunteers volunteers={volunteers} />
}
