import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../lib/jwt'
import { env } from '../lib/env'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const cookieToken = req.cookies?.[env.COOKIE_NAME]
  const header = req.header('Authorization')
  const bearer = header?.startsWith('Bearer ') ? header.slice(7) : undefined
  const token = cookieToken ?? bearer

  if (!token) return res.status(401).json({ error: 'Unauthenticated' })

  const payload = verifyJwt(token)
  if (!payload) return res.status(401).json({ error: 'Invalid token' })

  req.user = { id: payload.uid }
  ;(req as any).userId = payload.uid
  next()
}
