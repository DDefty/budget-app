import { z } from 'zod'


export const addIncomeSchema = z.object({
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    description: z.string().min(1, "Description is required"),
    account: z.string().min(1, "Account is required"),
    date: z.string().min(1, "Date is required"),
});

export const addExpenseSchema = z.object({
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    description: z.string().min(1, "Description is required"),
    date: z.string().min(1, "Date is required"),
    category: z.string().min(1, "Category is required"),
    account: z.string().min(1, "Account is required"),
    note: z.string().optional(),
});