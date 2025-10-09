import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../lib/jwt'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Unauthenticated' })
  const payload = verifyJwt(token)
  if (!payload) return res.status(401).json({ error: 'Invalid token' })
  // @ts-ignore - augmented in types file
  req.user = { id: payload.uid }
  next()
}
