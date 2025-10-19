import { prisma } from './../../lib/prisma';
import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth'
import bcrypt from 'bcryptjs';
import { dateSchema, emailSchema, genderSchema, nameSchema, passwordSchema } from './schemas';

export const settings = Router()


settings.patch('/settings/email', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' });
    const parse = emailSchema.safeParse(req.body)
    if (!parse.success) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    const { value } = parse.data;

    const existing = await prisma.user.findUnique({ where: { email: value } })
    if (existing) return res.status(409).json({ error: 'Email already registered' })

    const updateUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            email: value
        },
        select: {
            id: true,
            name: true,
            email: true,
            birth_date: true,
            gender: true,
        }
    })
    res.status(200).json(updateUser)
})

settings.patch('/settings/password', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' });
    const parse = passwordSchema.safeParse(req.body)
    if (!parse.success) {
        return res.status(400).json({ error: 'Invalid password format' });
    }
    const { value } = parse.data;

    const hash = await bcrypt.hash(value, 12)

    const updateUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            hash
        },
        select: {
            id: true,
            name: true,
            email: true,
            birth_date: true,
            gender: true,
        }
    })
    res.status(200).json(updateUser)
})

settings.patch('/settings/name', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' });
    const parse = nameSchema.safeParse(req.body)
    if (!parse.success) {
        return res.status(400).json({ error: 'Invalid name format' });
    }
    const { value } = parse.data;

    const updateUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name: value
        },
        select: {
            id: true,
            name: true,
            email: true,
            birth_date: true,
            gender: true,
        }
    })
    res.status(200).json(updateUser)
})

settings.patch('/settings/gender', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' });
    const parse = genderSchema.safeParse(req.body)
    if (!parse.success) {
        return res.status(400).json({ error: 'Invalid gender format input M or F' });
    }
    const { value } = parse.data;

    const updateUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            gender: value
        },
        select: {
            id: true,
            name: true,
            email: true,
            birth_date: true,
            gender: true,
        }
    })
    res.status(200).json(updateUser)
})

settings.patch('/settings/birthDate', requireAuth, async (req, res) => {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ error: 'Unauthenticated' });
    const parse = dateSchema.safeParse(req.body)
    if (!parse.success) {
        return res.status(400).json({ error: 'Invalid date format' });
    }
    const { value } = parse.data;

    const updateUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            birth_date: value
        },
        select: {
            id: true,
            name: true,
            email: true,
            birth_date: true,
            gender: true,
        }
    })
    res.status(200).json(updateUser)
})

