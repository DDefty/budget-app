import { prisma } from './../../lib/prisma';
import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { addExpenseSchema, addIncomeSchema } from './schemas';

export const transaction = Router()


transaction.get('/transactions', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' })

    const transactions = await prisma.transaction.findMany({
        where: { userId },
        select: { id: true, account: true, date: true, description: true, note: true, amount: true, currency: true, category: true }
    })

    res.status(200).json(transactions)
})

transaction.post('/transaction/addIncome', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' })

    const parse = addIncomeSchema.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ error: 'Invalid payload', issues: parse.error.issues })
    const { amount, description, date } = parse.data

    // HARDCODED categoryID
    const transaction = await prisma.transaction.create({ data: { userId, categoryId: 'cmgluf6gd0001u0us3g1oujf7', account: 'myAcc', date, description, note: 'test note', amount, currency: 'PLN' } });

    res.status(201).json(transaction);
})

transaction.post('/transaction/addExpense', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' })

    const parse = addExpenseSchema.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ error: 'Invalid payload', issues: parse.error.issues })
    const { amount, description, date, note } = parse.data

    // HARDCODED categoryID
    const transaction = await prisma.transaction.create({ data: { userId, categoryId: 'cmgluf6gd0001u0us3g1oujf8', account: 'myAcc', date, description, note, amount, currency: 'PLN' } });

    res.status(201).json(transaction);
})

transaction.delete('/transaction/:id', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' })

    const id = req.params.id;
    console.log(id);
    console.log(typeof id)
    const transaction = await prisma.transaction.findUnique({ where: { id }, })
    if (transaction === null) {
        return res.status(404).json({ error: 'Transasction not found' })
    } else {
        await prisma.transaction.delete({ where: { id }, })
    }
    res.status(204).json();
})

