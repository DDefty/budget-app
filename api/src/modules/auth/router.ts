import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../../lib/prisma'
import { registerSchema, loginSchema } from './schemas'
import { signJwt, verifyJwt } from '../../lib/jwt'
import { env } from '../../lib/env'

export const auth = Router()

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: 'lax' as const,
  domain: env.COOKIE_DOMAIN, // undefined locally
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

auth.post('/register', async (req, res) => {
  const parse = registerSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid payload', issues: parse.error.issues })
  const { name, email, password, confirmPassword } = parse.data

  if (password !== confirmPassword) return res.status(401).json({ error: `Passwords don't match` });

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(409).json({ error: 'Email already registered' })

  const hash = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({ data: { name, email, hash } })

  const token = signJwt({ uid: user.id })
  res.cookie(env.COOKIE_NAME, token, COOKIE_OPTIONS)
  res.status(201).json({ id: user.id, name: user.name, email: user.email })
})

auth.post('/login', async (req, res) => {
  const parse = loginSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid payload', issues: parse.error.issues })
  const { email, password } = parse.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: 'Invalid email or password' })

  const ok = await bcrypt.compare(password, user.hash)
  if (!ok) return res.status(401).json({ error: 'Invalid email or password' })

  const token = signJwt({ uid: user.id })
  res.cookie(env.COOKIE_NAME, token, COOKIE_OPTIONS)
  res.json({ id: user.id, name: user.name, email: user.email, gender: user.gender, birth_date: user.birth_date })
})

auth.post('/logout', (req, res) => {
  res.clearCookie(env.COOKIE_NAME, {
    ...COOKIE_OPTIONS,
  } as any)
  res.json({ ok: true })
})

auth.get('/me', async (req, res) => {
  const token = req.cookies?.[env.COOKIE_NAME]
  if (!token) return res.status(401).json({ error: 'Unauthenticated' })
  const payload = verifyJwt(token)
  if (!payload) return res.status(401).json({ error: 'Invalid token' })

  const user = await prisma.user.findUnique({ where: { id: payload.uid }, select: { id: true, name: true, email: true, gender: true, birth_date: true, createdAt: true } })
  if (!user) return res.status(401).json({ error: 'User not found' })
  res.json(user)
})