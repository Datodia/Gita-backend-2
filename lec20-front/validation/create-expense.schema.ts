import * as zod from 'zod'

export const createExpenseSchema = zod.object({
    category: zod.string(),
    amount: zod.coerce.number(),
})

export type CreateExpenseType = zod.infer<typeof createExpenseSchema>
