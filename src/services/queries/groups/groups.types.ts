import { MEMBERS } from '@/constants'

export type FormGroup = {
	name: string
	eventId: string
	members: Array<{
		type: MEMBERS
		member: string
	}>
}
