import { z } from 'zod'


export const addIncomeSchema = z.object({
    amount: z.number(),
    description: z.string().min(4).max(60),
    date: z.coerce.date(),
})

export const addExpenseSchema = z.object({
    date: z.coerce.date(),
    description: z.string().min(4).max(60),
    amount: z.number(),
    note: z.string().min(4).max(300),
})