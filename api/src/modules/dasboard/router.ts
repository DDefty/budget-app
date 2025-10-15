import { prisma } from './../../lib/prisma';
import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'

export const dashboard = Router()




dashboard.get('/dashboard/overview', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' });

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    try {
        const grouped = await prisma.transaction.groupBy({
            by: ["categoryId"],
            where: {
                userId,
                category: { kind: "EXPENSE" },
                date: { gte: monthStart, lt: nextMonthStart },
            },
            _sum: { amount: true },
        });

        const categoryIds = grouped.map(g => g.categoryId);
        const categories = await prisma.category.findMany({
            where: { userId, id: { in: categoryIds } },
            select: { id: true, name: true },
        });
        const nameById = new Map(categories.map(c => [c.id, c.name]));

        const data = grouped.map(g => ({
            category: nameById.get(g.categoryId) ?? "Other",
            total: Math.abs(Number(g._sum.amount ?? 0)),
        }));

        const totalSum = data.reduce((acc, d) => acc + d.total, 0);
        const analysis = data.map(d => ({
            ...d,
            percentage: totalSum ? Number(((d.total / totalSum) * 100).toFixed(1)) : 0,
        }));

        const [
            totalBalanceAgg,
            monthlyExpenseAgg,
            upcomingBillsAgg,
            recentTransactions,
        ] = await Promise.all([
            prisma.transaction.aggregate({
                where: { userId },
                _sum: { amount: true },
            }),
            prisma.transaction.aggregate({
                where: {
                    userId,
                    date: { gte: monthStart, lt: nextMonthStart },
                    category: { kind: "EXPENSE" },
                },
                _sum: { amount: true },
            }),
            prisma.transaction.aggregate({
                where: {
                    userId,
                    date: { gte: now, lt: nextMonthStart },
                    category: { kind: "EXPENSE" },
                },
                _sum: { amount: true },
            }),
            prisma.transaction.findMany({
                where: { userId },
                select: {
                    date: true,
                    description: true,
                    category: {
                        select: {
                            name: true,
                        },
                    },
                    amount: true,
                },
                orderBy: { date: 'desc' },
                take: 5,
            }),
        ]);

        const toNumber = (v: any) => Number(v ?? 0);

        res.status(200).json({
            overview: {
                totalBalance: toNumber(totalBalanceAgg._sum.amount),
                totalExpense: Math.abs(toNumber(monthlyExpenseAgg._sum.amount)),
                upcomingBills: toNumber(upcomingBillsAgg._sum.amount),
            },
            analysis,
            transactions: recentTransactions,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
});