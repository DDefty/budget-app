import { prisma } from './../../lib/prisma';
import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import { addExpenseSchema, addIncomeSchema } from './schemas';

export const transaction = Router()


transaction.get('/transactions', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' })

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [transactions, total] = await Promise.all([
        prisma.transaction.findMany({
            where: { userId },
            select: { 
                id: true, account: true, date: true, description: true, 
                note: true, amount: true, currency: true, category: true 
            },
            skip,
            take: limit,
        }),
        prisma.transaction.count({ where: { userId } })
    ])

    res.status(200).json({
        data: transactions,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    })
})

transaction.post('/transaction/addIncome', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' })

    const parse = addIncomeSchema.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ error: 'Invalid payload', issues: parse.error.issues })
    const { amount, description, account, date } = parse.data

    // HARDCODED categoryID
    const transaction = await prisma.transaction.create({ data: { userId, categoryId: 'cmgluf6gd0001u0us3g1oujf7', account, date, description, amount, currency: 'PLN' } });

    res.status(201).json(transaction);
})

transaction.post('/transaction/addExpense', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' })

    const parse = addExpenseSchema.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ error: 'Invalid payload', issues: parse.error.issues })
    const { amount, description, account, date, note } = parse.data

    // HARDCODED categoryID
    const transaction = await prisma.transaction.create({ data: { userId, categoryId: 'cmgluf6gd0001u0us3g1oujf8', account, date, description, note, amount, currency: 'PLN' } });

    res.status(201).json(transaction);
})

transaction.delete('/transaction/:id', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' })

    const id = req.params.id;
    const transaction = await prisma.transaction.findUnique({ where: { id }, })
    if (transaction === null) {
        return res.status(404).json({ error: 'Transasction not found' })
    } else {
        await prisma.transaction.delete({ where: { id }, })
    }
    res.status(204).json();
})

transaction.put('/transaction/editIncome/:id', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' })

    const parse = addIncomeSchema.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ error: 'Invalid payload', issues: parse.error.issues })

    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Provide transaction ID' })
    }

    const transaction = await prisma.transaction.findUnique({ where: { id }, })
    const { amount, description, account, date } = parse.data
    if (transaction === null) {
        return res.status(404).json({ error: 'Transasction not found' })
    } else {
        await prisma.transaction.update({ where: { id }, data: {amount, description, account, date}})
    }


    res.status(200).json(transaction);
})

transaction.put('/transaction/editExpense/:id', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' })

    const parse = addExpenseSchema.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ error: 'Invalid payload', issues: parse.error.issues })

    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Provide transaction ID' })
    }

    const transaction = await prisma.transaction.findUnique({ where: { id }, })
    const { amount, description, account, date, note } = parse.data
    if (transaction === null) {
        return res.status(404).json({ error: 'Transasction not found' })
    } else {
        await prisma.transaction.update({ where: { id }, data: {amount, description, account, date, note}})
    }


    res.status(200).json(transaction);
})