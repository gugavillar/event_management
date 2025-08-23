import { z } from 'zod'

import {
	AMOUNT_TYPE,
	TRANSACTION_TYPE,
} from '@/components/Organisms/TransactionDrawer/TransactionDrawer.utils'
import {
	MAX_CURRENCY_VALUE,
	MAX_FIELD_LENGTH,
	MIN_CURRENCY_VALUE,
} from '@/constants'

export const transactionSchemaRoute = z.object({
	eventId: z.uuid(),
	type: z.enum([...TRANSACTION_TYPE.map(({ value }) => value)]),
	amount: z.coerce.number().min(MIN_CURRENCY_VALUE).max(MAX_CURRENCY_VALUE),
	amountType: z.enum([...AMOUNT_TYPE.map(({ value }) => value)]),
	description: z.string().trim().min(3).max(MAX_FIELD_LENGTH),
	date: z.iso.datetime({ precision: 3 }),
})
