import jwt from 'jsonwebtoken'
import { env } from './env'

type JwtPayload = { uid: string }

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d' })
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}
